module.exports = (sequelize, DataTypes) => {
  const Entry = sequelize.define('Entry', {
    title: DataTypes.TEXT,
    subTitle: DataTypes.TEXT,
    author: DataTypes.STRING,
    content: DataTypes.TEXT,
    topics: DataTypes.TEXT,
    image: DataTypes.STRING,
    youtubeId: DataTypes.STRING
  })
  return Entry
}
