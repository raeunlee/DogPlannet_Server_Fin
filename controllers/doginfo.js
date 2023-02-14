const { doginfos, validateData } = require('../models/doginfos');
const dogrecords = require('../models/dogrecords');
const sequelize = require('sequelize');
const dogRecordService = require('../services/doginfo');



//강아지 기본 정보 받아오기
exports.savedoginfo = async (req, res) => {
    const { error } = validateData(req.body);
    if (error) return res.status(400).send(error.details[0].message);
  
    let savedoginfo = new doginfos({
      dog_name: req.body.dog_name,
      dogtype: req.body.dogtype,
      dog_sex: req.body.dog_sex,
      dog_birthyear: req.body.dog_birthyear,
    });
    try {
        savedoginfo = await savedoginfo.save();
      res.send({ message: 'Data saved successfully', savedoginfo });
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  };

//강아지 기록 정보 받아오기
exports.savedogrecords = async (req, res) => {
    const { error } = validateData(req.body);
    if (error) return res.status(400).send(error.details[0].message);
  
    let savedogrecords = new dogrecords({
      date: req.body.date,
      weight: req.body.weight,
      poop_type: req.body.poop_type,
      walk_distance: req.body.distance,
      walk_time: req.body.time,
      mydog: req.body.image
    });
  
    try {
        savedogrecords = await savedogrecords.save();
      res.send({ message: 'Data saved successfully', savedogrecords });
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  };

//날짜와 id에 맞는 강아지의 기록 보내기
  exports.getDogRecords = async (req, res) => {
    const { date, user_id } = req.params;
  
    try {
      const dogRecords = await dogRecordService.getDogRecords(date, user_id);
      res.json(dogRecords);
    } catch (error) {
      res.status(500).send(error);
    }
  };