module.exports = {
    "up": "ALTER TABLE user_goal ADD answer TEXT NULL AFTER caption",
    "down": "ALTER TABLE user_goal DROP COLUMN answer"
}