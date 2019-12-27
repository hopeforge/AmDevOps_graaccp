var mongoose = require('mongoose');
const Schema = mongoose.Schema;

var LevelsSchema = new mongoose.Schema({
    level: {
        type: Number,
        default: 0
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'Users',
        required: true,
        unique: true
    },
    exp: {
        type: Number,
        default: 0
    }
});

const processPoint = (lvlOBJ, addPoints) => new Promise(async (resolve, reject) => {
    try {
        let userLevel = lvlOBJ.level;
        let levelXPMax = (300 * userLevel / 1);
        let levelXPNextMax = levelXPMax + 1;
        let newXP = lvlOBJ.exp + addPoints;
        if (newXP > levelXPMax) {
            lvlOBJ.level++;
            if (newXP > levelXPNextMax) {
                lvlOBJ = await processPoint(lvlOBJ, addPoints);
            } else {
                lvlOBJ.exp = 0;
            }
        } else {
            lvlOBJ.exp = newXP;
        }
        resolve(await lvlOBJ.save());
    } catch (error) {
        reject(error)
    }
})

LevelsSchema.statics.getLevel = (userID, callback) => {
    Levels.findOne({ user: userID }).lean().exec((err, userLevel) => {
        if (err) return callback(err)
        if (!userLevel) {
            new Levels({
                user: userID
            }).save()
                .then((userLevelNew) => callback(null, userLevelNew))
                .catch((err) => callback(err))
        } else {
            callback(null, userLevel)
        }
    });
}

LevelsSchema.statics.levelUp = (userID, points, callback) => {
    Levels.findOne({ user: userID }).exec(async (err, userLevel) => {
        if (err) return callback(err)
        if (!userLevel) {
            new Levels({
                user: userID
            }).save()
                .then(async (userLevelNew) => callback(null, await processPoint(userLevelNew, points)))
                .catch((err) => callback(err))
        } else {
            callback(null, await processPoint(userLevel, points))
        }
    });
}

var Levels = mongoose.model('Levels', LevelsSchema);

module.exports = Levels;