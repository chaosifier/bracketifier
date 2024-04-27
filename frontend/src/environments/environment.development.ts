export const environment = {
  production: false,
  apiUrl: `http://localhost:3000`,
  createUserUrl: `http://localhost:3000/users/signup`,
  getUserUrl: `http://localhost:3000/users/signin`,
  tournamentApiPaths: {
    create: 'tournaments',
    update: 'tournaments',
    delete: 'tournaments',
    getById: 'tournaments',
    getMy: 'tournaments/manage'
  },
  participantApiPaths: {
    delete: `participants`,
    create: `participants`,
    update: `participants`,
  },
  eventsApiPaths: {
    base : `events`,
    update: `events`,
    generateBracket: `generate-bracket-events`
  }
};
