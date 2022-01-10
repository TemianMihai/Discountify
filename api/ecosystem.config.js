module.exports = {
  apps : [{
    name: "api",
    script: "dist/main.js",
    instances: 1,
    exec_mode : "cluster",
    node_args: "--max-old-space-size=2048 --nouse-idle-notification",
    args: "--max-old-space-size=2048 --nouse-idle-notification"
  }],
};
