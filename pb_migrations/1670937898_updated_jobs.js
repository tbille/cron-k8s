migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("2y6qe2ahymu23f5")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "phjybomr",
    "name": "enabled",
    "type": "bool",
    "required": true,
    "unique": false,
    "options": {}
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("2y6qe2ahymu23f5")

  // remove
  collection.schema.removeField("phjybomr")

  return dao.saveCollection(collection)
})
