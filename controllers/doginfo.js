const { doginfos, validateData } = require('../models/doginfos');
const { dogrecords, validateData} = require('../models/dogrecords');
const sequelize = require('sequelize');


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
      distance: req.body.distance,
      time: req.body.time,
      image: req.body.image
    });
  
    try {
        savedogrecords = await savedogrecords.save();
      res.send({ message: 'Data saved successfully', savedogrecords });
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  };

//강아지의 날짜에 맞는 기록 보내기
exports.getByDate = async (req, res) => {
    const date = req.params.date;
  
    try {
      const data = await dogrecords.findAll({
        where: {
          date: date
        }
      });
      if (!data) return res.status(404).send({ message: 'Data not found' });
      res.send(data);
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  };