const getters = {
  pos: state => state.transfer.pos,
  startObj: state => state.transfer.startObj,
  endObj: state => state.transfer.endObj,
  policy: state => state.line.policy,
  city: state => state.line.city
}
export default getters
