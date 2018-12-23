exports.shorthands = undefined

exports.up = (pgm) => {
  pgm.createTable('users', {
    id: 'id',
    user_id: { type: 'string', notNull: true },
    name: { type: 'string', notNull: true },
    bio: { type: 'string', notNull: true },
    distance_mi: { type: 'integer' },
    ping_time: { type: 'timestamp', notNull: true },
    birth_date: { type: 'timestamp' },
    gender: { type: 'integer', notNull: true, default: 1 },
    createdAt: {
      type: 'timestamp',
      notNull: true,
      default: pgm.func('current_timestamp')
    },
    updatedAt: {
      type: 'timestamp',
      notNull: true,
      default: pgm.func('current_timestamp')
    }
  })
}

exports.down = (pgm) => {
  pgm.dropTable('users')
}
