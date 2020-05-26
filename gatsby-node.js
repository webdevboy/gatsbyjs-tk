const create = require("./create/create")

exports.createPagesStatefully = async ({ graphql, actions, reporter }) => {
  await create({ actions, graphql, reporter })
}
