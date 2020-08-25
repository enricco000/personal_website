module.exports = (sequelize, DataTypes) => {
  const Entry = sequelize.define('Entry', {
    title: DataTypes.TEXT,
    subTitle: DataTypes.TEXT,
    summary: DataTypes.TEXT,
    author: DataTypes.STRING,
    content: DataTypes.TEXT,
    topics: DataTypes.TEXT
  })
  return Entry
}
