import {rest} from 'msw';

export const handlers = [
  rest.get('/hello-msw', (req, res, ctx) => {
    return res(
      ctx.json({
        message: 'Hello MSW!',
      })
    );
  }),
];
