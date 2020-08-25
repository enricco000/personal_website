module.exports = (sequelize) => {
  const Bookmark = sequelize.define('Bookmark', {})

  Bookmark.associate = function (models) {
    Bookmark.belongsTo(models.User, { onDelete: 'CASCADE',
                                      onUpdate: 'NO ACTION' })
    Bookmark.belongsTo(models.Entry, { onDelete: 'CASCADE',
                                        onUpdate: 'NO ACTION' })
  }
  return Bookmark
}
