import { createPathGenerator } from '../path';

type QueryParamsType = {
  page?: string;
};

type ResourceParamsType = {
  boardId?: string;
  postId?: string;
};

describe('createPathGenerator 테스트', () => {
  it('resourceName이 주어지지 않으면 에러를 반환합니다', () => {
    expect(() => createPathGenerator()).toThrow();
    expect(() => createPathGenerator({ resourceName: '' })).toThrow();
  });

  it('반환값은 함수입니다', () => {
    const generateBoardsPath = createPathGenerator({
      resourceName: 'boards',
      resourceIdKey: 'boardId',
    });
    expect(typeof generateBoardsPath).toBe('function');
  });

  describe('단일 리소스 경로 생성기 테스트', () => {
    const generateBoardsPath = createPathGenerator<
      ResourceParamsType,
      QueryParamsType
    >({
      resourceName: 'boards',
      resourceIdKey: 'boardId',
    });

    it('인자로 id가 주어지면 id를 포함한 경로를 반환합니다', () => {
      expect(generateBoardsPath({ resources: { boardId: '1' } })).toBe(
        '/boards/1',
      );
    });

    it('인자로 queries가 주어지면 쿼리스트링을 포함한 경로를 반환합니다', () => {
      expect(generateBoardsPath({ queries: { page: '1' } })).toBe(
        '/boards?page=1',
      );
    });

    it('인자로 id와 queries가 주어지면 id와 쿼리스트링을 포함한 경로를 반환합니다', () => {
      expect(
        generateBoardsPath({
          resources: { boardId: '1' },
          queries: { page: '1' },
        }),
      ).toBe('/boards/1?page=1');
    });

    it('인자로 아무것도 주어지지 않으면 기본 경로를 반환합니다', () => {
      expect(generateBoardsPath()).toBe('/boards');
    });
  });

  describe('복수 리소스 경로 생성기 테스트', () => {
    const generateBoardsPath = createPathGenerator<
      ResourceParamsType,
      QueryParamsType
    >(
      { resourceName: 'boards', resourceIdKey: 'boardId' },
      { resourceName: 'posts', resourceIdKey: 'postId' },
    );

    it('인자로 id가 주어지면 id를 포함한 경로를 반환합니다', () => {
      expect(
        generateBoardsPath({
          resources: { boardId: '1', postId: '1' },
        }),
      ).toBe('/boards/1/posts/1');

      expect(
        generateBoardsPath({
          resources: { boardId: '1' },
        }),
      ).toBe('/boards/1/posts');
    });

    it('인자로 queries가 주어지면 쿼리스트링을 포함한 경로를 반환합니다', () => {
      expect(generateBoardsPath({ queries: { page: '1' } })).toBe(
        '/boards/posts?page=1',
      );
    });
  });
});
