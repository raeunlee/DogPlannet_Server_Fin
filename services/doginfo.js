const doginfoModel = require("../models/doginfos");
const dogrecords = require("../models/dogrecords");


//강아지 기록 가공하기.
exports.getDogRecords = (date, userId) =>{
    return dogrecords.findAll({
        where:{
            date,
            user_id:userId,
        },
        attributes: ['weight','poop_type','walk_time', 'walk_distance']
    });
};