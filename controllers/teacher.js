const User = require('../models/user');
const topicRequest = require('../models/topicRequest');
const Topic = require('../models/topic');
const Faculty = require('../models/faculty');
const Specialization = require('../models/specialization');
const sanitizeHtml = require('sanitize-html');
const jwt = require('jsonwebtoken');
const  myStudents = require('../models/myStudents');
const { Op } = require('sequelize');
const RequestedTopicComment = require('../models/requestedTopicComment');

const onlyTeachers = async (req, res, next) => { 
  res.json({ onlyTeacher: process.env.ONLYTEACHERS === "true" });
};

const teacherTopics = async (req, res) => {
  try{
    const user = req.user;
    console.log(user);
    const teacherId = user.id;

    const faculties = await Faculty.findAll(
      {
        include: [
          {
            model: Specialization,
            as: 'specializations',
          }
        ]
      }
    );

    if(faculties.length === 0){
      return res.status(404).json({ message: 'Faculties not found' });
    }

    const topics = await Topic.findAll({
      where: {
        user_id: teacherId
      },
      include: [
        {
          model: Specialization,
          as: 'specializations',
          include: {
            model: Faculty,
            as: 'faculty',
            attributes: ['id']
          }
        },
        {
          model: User,
          as: 'user'
        }
      ]
    });
    
    if (!topics) {
      return res.status(404).json({ message: 'Topics not found' });
    }

    console.log('Topics:', topics);
    res.status(200).json({ topics, faculties: faculties });
  }
  catch (error) {
    console.error('Error getting topics:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const teacherTopic = async (req, res) => {
  try{
    const topic_id = req.params.id;
    const user = req.user;
    
    const topic = await Topic.findByPk(topic_id, {
      include: [
        {
            model: Specialization,
            as: 'specializations',
            attributes: ['id'],
            include: {
              model: Faculty,
              as: 'faculty',
              attributes: ['id', 'name']
            }
        },
        {
          model: User,
          as: 'user',
        }
      ]
    }
    );

    if (!topic) {
      return res.status(404).json({ message: 'Topic not found' });
    }

    if(topic.user_id !== user.id){
      return res.status(403).json({ message: 'Forbidden, topic not yours' });
    }

    const faculties = await Faculty.findAll(
      {
        include: [
          {
            model: Specialization,
            as: 'specializations',
          }
        ]
      }
    );

    res.json({ topic: topic, faculties: faculties });
  }
  catch (error) {
    console.error('Error getting topic:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const getSpecializations = async (req, res) => {
  try{
    const faculty_id = req.params.id;

    const specializations = await Specialization.findAll({
        where: {
            faculty_id: faculty_id
        }
    });

    if(!specializations){
      return res.status(404).send('Specializations not found')
    }

    res.json(specializations);
  } catch (error) {
      console.error('Error fetching specializations:', error);
      res.status(500).send('Internal Server Error');
  }

};

const addTopic = async (req, res) => {
  try {
    const user = req.user;
    const teacherId = user.id;

    console.log('User:', user);

    let { title, description, keywords, slots, education_level, specialization_ids } = req.body;

    title = sanitizeHtml(title);
    description = sanitizeHtml(description);
    keywords = sanitizeHtml(keywords);

    const topic = await Topic.create({
      title,
      description,
      keywords,
      slots,
      user_id: teacherId,
      education_level
    });

    if (!topic) {
      return res.status(500).json({ message: 'Error adding topic' });
    }

    const specializations = await Specialization.findAll({
      where: { id: specialization_ids }
    });

    if (specializations.length !== specialization_ids.length) {
      return res.status(400).json({ message: "One or more specialization IDs are invalid" });
    }

    await topic.setSpecializations(specializations); 

    const data = {
      id: topic.id,
      title: topic.title,
      description: topic.description,
      keywords: topic.keywords,
      slots: topic.slots,
      education_level: topic.education_level,
      specializations: specializations,
      user: user
    }

    console.log('Topic added:', topic);

    res.status(201).json({ topic: data });
  } catch (error) {
    console.error('Error adding topic:', error);
    res.status(500).send('Internal Server Error');
  }
};

const editTopic = async (req, res) => {
  try {
    const topicId = req.params.id;
    const user = req.user;

    let { title, description, keywords, slots, education_level, specialization_ids } = req.body;

    title = sanitizeHtml(title);
    description = sanitizeHtml(description);
    keywords = sanitizeHtml(keywords);

    const topic = await Topic.findByPk(topicId, {
      include: [{ model: Specialization, as: 'specializations' }]
    });

    console.log('Topic:', topic);

    if (!topic) {
      return res.status(404).json({ message: 'Topic not found' });
    }

    if (!user || user.id !== topic.user_id) {
      return res.status(403).json({ message: 'Forbidden, you are not the owner of this topic' });
    }

    if (process.env.ONLYTEACHERS === "false") {
      topic.slots = slots;
      topic.education_level = topic.education_level;  
      topic.title = topic.title;
      topic.description = topic.description;
      topic.keywords = topic.keywords;
    } else {
      topic.title = title;
      topic.description = description;
      topic.keywords = keywords;
      topic.slots = slots;
      topic.education_level = education_level; 

      await topic.setSpecializations([]); 

      const specializations = await Specialization.findAll({
        where: { id: specialization_ids }
      });

      if (specializations.length !== specialization_ids.length) {
        return res.status(400).json({ message: "Invalid specialization IDs" });
      }

      await topic.setSpecializations(specializations);
    }

    await topic.save();

    const updatedTopic = {
      id: topic.id,
      title: topic.title,
      description: topic.description,
      keywords: topic.keywords,
      slots: topic.slots,
      education_level: topic.education_level,
      specializations: await topic.getSpecializations(),
      user: user
    };

    res.json({ topic: updatedTopic });
  } catch (error) {
    console.error('Error editing topic:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const deleteTopic = async (req, res) => {
  try{
    const topicId = req.params.id;
    const user = req.user;
  
    const topic = await Topic.findByPk(topicId);

    if (!topic) {
      return res.status(404).json({ message: 'Topic not found' });
    }

    if(!user || user.id !== topic.user_id){
      return res.status(403).json({ message: 'Forbidden, you are not the owner of this topic' });
    }

    await topic.destroy();

    res.status(204).json({ message: 'Topic deleted' });
  }
  catch (error) {
    console.error('Error deleting topic:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

//Student requests------------------------------------------------------------------------------------------------------
const studentRequests = async (req, res) => {
  try{
    const user = req.user;
    const teacherId = user.id;

    const requests = await topicRequest.findAll({
      where: {
        teacher_id: teacherId
      },
      include: [{
          model: User,
          as: 'student'
        },
        {
          model: Topic,
          as: 'topic'
        }
      ]
    });

    if(!requests){
      return res.status(404).json({ message: 'Requests not found' });
    }

    res.status(200).json({ requests: requests });
  }
  catch (error) {
    console.error('Error getting requests:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}

const studentRequest = async (req, res) => {
  try{
    const requestId = req.params.id;
    const refreshToken = req.cookies.refreshToken;
    const user = req.user;

    const request = await topicRequest.findByPk(requestId,
      {
        include: [{
            model: User,
            as: 'student',
          },
          {
            model: Topic,
            as: 'topic'
          },
          {
            model: RequestedTopicComment,
            as: 'comments',
            include: {
              model: User,
              as: 'user'
            }
          }
        ]
      }
    );

    if (!request) {
      return res.status(404).json({ message: 'Request not found' });
    }

    if(request.teacher_id !== teacherId){
      return res.status(403).send('Forbidden, you are not the owner of this request');
    }

    res.status(200).json({ request: request });
  }
  catch (error) {
    console.error('Error getting request:', error);
    res.status(500).send('Internal Server Error');
  }
}

const teacherResponse = async (req, res) => {
  try{
    const requestId = req.params.id;
    const user = req.user;
    const teacherId = user.id;
    let { status } = req.body;

    const request = await topicRequest.findByPk(requestId,
      {
        include: [{
            model: User,
            as: 'student',
          },
          {
            model: Topic,
            as: 'topic'
          }
        ]
      }
    );

    if (!request) {
      return res.status(404).json({ message: 'Request not found' });
    }

    if(request.teacher_id !== teacherId){
      return res.status(403).send('Forbidden, you are not the owner of this request');
    }

    request.status = status;
    await request.save();

    res.json({ message: 'Response sent', request: request});
  }
  catch (error) {
    console.error('Error responding to request:', error);
    res.status(500).send('Internal Server Error');
  }
}

const deleteRequest = async (req, res) => {
  try{
    const user = req.user;
    const requestId = req.params.id;

    const request = await topicRequest.findByPk(requestId);

    if (!request) {
      return res.status(404).json({ message: 'Request not found' });
    }

    if(!user || user.id !== request.teacher_id){
      return res.status(403).send('Forbidden, you are not the owner of this request');
    }

    await request.destroy();

    res.json({ message: 'Request deleted' });
  }
  catch (error) {
    console.error('Error deleting request:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const addComment = async (req, res) => {
  try {
    const user = req.user;
    const teacher_id = user.id;
    const request_id = req.params.id;
    let { commentMessage } = req.body;

    commentMessage = sanitizeHtml(commentMessage);

    const request = await topicRequest.findByPk(request_id,
      {
        include: [{
          model: User,
          as: 'teacher'
        },
      ]
      }
    );

    if (!request) {
      return res.status(404).json({ message: 'Request not found' });
    }

    if(request.teacher_id !== teacher_id){
      return res.status(403).json({ message: 'Forbidden, request not yours' });
    }

    const comment = await RequestedTopicComment.create({
      user_id: teacher_id,
      request_id: request_id,
      message: commentMessage
    });

    if (!comment) {
      return res.status(500).json({ message: 'Error creating comment' });
    }

    const data = { id: comment.id, createdAt: comment.createdAt, user_id: teacher_id, request_id, message: commentMessage, user };

    res.status(201).json({ message: 'Comment created', comment: data });
  }
  catch (error) {
    console.error('Error creating comment:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const getMyStudents = async (req, res) => {
  try{
    const user = req.user;
    const teacherId = user.id;

    const students = await myStudents.findAll({
      where: {
        teacher_id: teacherId
      },
      include: [{
          model: User,
          as: 'student'
        },
        {
          model: topicRequest,
          as: 'request',
          include: {
            model: Topic,
            as: 'topic'
          }
        }
      ]
    });

    if(!students){
      return res.status(404).json({ message: 'Students not found' });
    }

    res.status(200).json({ students: students });
  } catch (error) {
    console.error('Error getting students:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}

//Search & Filters

// Requests
const requestSearchFilter = async (req, res) => {
  try {
    const user = req.user;
    const { query, status } = req.query;

    let whereCondition = {
      teacher_id: user.id,
    };

    if (status) {
      whereCondition.status = status; 
    }

    if (query) {
      whereCondition[Op.or] = [
        { '$student.first_name$': { [Op.like]: `%${query}%` } },
        { '$student.name$': { [Op.like]: `%${query}%` } },
        { '$topic.title$': { [Op.like]: `%${query}%` } },
      ];
    }

    const requests = await topicRequest.findAll({
      where: whereCondition,
      include: [
        {
          model: User,
          as: "student",
          attributes: ["id", "first_name", "name", "email"]
        },
        {
          model: Topic,
          as: "topic",
          attributes: ["id", "title", "keywords","slots","education_level"]
        },
      ],
    });

    if (requests.length === 0) {
      return res.status(204).json({ message: "No requests found." });
    }

    console.log(requests);
    return res.json({ requests });
  } catch (error) {
    console.error("Error searching requests:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const topicSearchFilter = async (req, res) => {
  try {
    const user = req.user;
    const { query, education_level, slots } = req.query;

    let whereCondition = {
      user_id: user.id,
    };

    if (education_level) {
      whereCondition.education_level = education_level;
    }

    if (slots) {
      whereCondition.slots = slots === "0" ? 0 : { [Op.gte]: 1 };
    }

    if (query) {
      whereCondition[Op.or] = [
        { title: { [Op.like]: `%${query}%` } },
        { keywords: { [Op.like]: `%${query}%` } },
      ];
    }

    const topics = await Topic.findAll({
      where: whereCondition,
      include: [
        {
          model: User,
          as: "user",
          attributes: ["id", "first_name", "name", "email"]
        },
        {
          model: Specialization,
          as: "specializations",
          attributes: ["id", "name"]
        },
      ],
    });

    if (topics.length === 0) {
      return res.status(204).json({ message: "No topics found." });
    }

    console.log(topics);
    return res.json({ topics });
  } catch (error) {
    console.error("Error searching topics:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  onlyTeachers,
  teacherTopics,
  teacherTopic,
  getSpecializations,
  addTopic,
  editTopic,
  deleteTopic,
  studentRequests,
  studentRequest,
  teacherResponse,
  deleteRequest,
  addComment,
  getMyStudents,
  requestSearchFilter,
  topicSearchFilter
};