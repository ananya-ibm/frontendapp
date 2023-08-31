function addAndFormat(d, cfg) {
  d.push({
    ...cfg,
    type: 'add',
    path: `../${cfg.path}`
  });
  d.push({
    type: 'format',
    path: cfg.path
  })
}

module.exports = { addAndFormat }