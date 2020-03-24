const moment = require('moment')

module.exports = (sequelize, DataTypes) => {
  var Model = sequelize.define('Tasks', {
    // attributes
    text: {
      type: DataTypes.STRING,
      allowNull: false
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      default : 'created'
    },
    /*status_date: {
      type: DataTypes.DATE,
      allowNull: false,
      get : function(fieldName) {
        const rawValue = this.getDataValue('release_date');
        return moment(rawValue).format('YYYY-MM-DD');
      }
    },*/
    createdAt : {
      field : 'created_at',
      type : DataTypes.DATE
    }, 
    updatedAt : {
      field : 'updated_at',
      type : DataTypes.DATE
    }
  }, {
    tableName : 'tasks',
    timestamps : false
  });

  return Model;
}
