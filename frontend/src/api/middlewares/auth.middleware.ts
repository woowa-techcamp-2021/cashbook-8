import Router from '../../core/router';

const authMiddleware = async <T>(request: () => Promise<T>): Promise<T> => {
  try {
    return await request();
  } catch (error) {
    const { status } = error;

    if (status === 401 || status === 410) {
      Router.instance.push('login');
    }

    throw error;
  }
};

export default authMiddleware;
