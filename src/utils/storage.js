function loadState(key) {
  const stringifiedData = localStorage.getItem(key);
  return JSON.parse(stringifiedData);
}

function updateState(key, data) {
  const stringifiedData = JSON.stringify(data);
  const savedData = localStorage.setItem(key, stringifiedData);
  return savedData;
}

function removeState(key) {
  localStorage.removeItem(key)
}

function clearStorage() {
  localStorage.clear();
}

export default {
  clearStorage,
  updateState,
  loadState,
  removeState,
};
