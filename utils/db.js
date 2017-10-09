module.exports = {
  findAll(res, model, conditions) {
    model.findAll(conditions)
      .then(function(data){
        res.json(data)
      })
      .catch(function(err){
        res.json({err: err})
      });
  },
  query(res, sequelize, query, rep){
    sequelize.query(query, {replacements: rep, type: sequelize.QueryTypes.SELECT}, {raw:true})
      .then(function(data){
        res.json(data)
      })
      .catch(function(err){
        res.json({err:err})
      });
  }
}
