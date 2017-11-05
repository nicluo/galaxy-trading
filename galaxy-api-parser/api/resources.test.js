import Resources from './resources';

describe('Resources', () => {
  test('getResourcesList should return empty array', () => {
    const r = new Resources();
    expect(r.getResourcesList()).toEqual([]);
  });

  test('addResource should add new item into resourceList', () => {
    const r = new Resources();
    r.addResource('Iron');
    expect(r.getResourcesList()).toEqual(['iron']);
  });

  test('addResource should not add duplicate item into resourceList', () => {
    const r = new Resources();
    r.addResource('Iron');
    r.addResource('Iron');
    expect(r.getResourcesList()).toEqual(['iron']);
  });

  test('addResource should append new item into resourceList', () => {
    const r = new Resources();
    r.addResource('Iron');
    r.addResource('Credits');
    expect(r.getResourcesList()).toEqual(['iron', 'credits']);
  });

  test('addResource should append new item into resourceList', () => {
    const r = new Resources();
    r.addResource('Iron');
    r.addResource('Credits');
    expect(r.getResourcesList()).toEqual(['iron', 'credits']);
  });

  test('queryRelation should return null in case of unrelated query', () => {
    const r = new Resources();
    r.addResource('Iron');
    r.addResource('Credits');
    expect(r.queryRelation(10, 'Iron', 'Credits')).toBeNull();
  });

  test('queryRelation should return results in case of identity query', () => {
    const r = new Resources();
    r.addResource('Iron');
    expect(r.queryRelation(10, 'Iron', 'Iron')).toEqual([
      {resource: 'Iron', amount: 10},
      {resource: 'Iron', amount: 10},
      ]);
  });

  test('queryRelation should return results using simple relations', () => {
    const r = new Resources();
    r.addResource('Iron');
    r.addResource('Credits');
    r.addResourceRelation(10, 'Iron', 50, 'Credits');
    expect(r.queryRelation(20, 'Iron', 'Credits')).toEqual([
      {resource: 'Iron', amount: 20},
      {resource: 'Credits', amount: 100},
    ]);
  });

  test('queryRelation should return results using simple inverse relations', () => {
    const r = new Resources();
    r.addResource('Iron');
    r.addResource('Credits');
    r.addResourceRelation(10, 'Iron', 50, 'Credits');
    expect(r.queryRelation(100, 'Credits', 'Iron')).toEqual([
      {resource: 'Credits', amount: 100},
      {resource: 'Iron', amount: 20},
    ]);
  });

  test('findRelationPath should return results using simple relations', () => {
    const r = new Resources();
    r.addResource('Iron');
    r.addResource('Credits');
    r.addResourceRelation(10, 'Iron', 50, 'Credits');
    expect(r.findRelationPath('Iron', 'Credits')).toEqual(['credits']);
    expect(r.findRelationPath('Credits', 'Iron')).toEqual(['iron']);
  });

  test('findRelationPath should return results using transitive relations', () => {
    const r = new Resources();
    r.addResource('Iron');
    r.addResource('Credits');
    r.addResource('Dirt');
    r.addResourceRelation(10, 'Iron', 50, 'Credits');
    r.addResourceRelation(25, 'Credits', 50, 'Dirt');
    expect(r.findRelationPath('Iron', 'Dirt')).toEqual(['credits', 'dirt']);
    expect(r.findRelationPath('Dirt', 'Iron')).toEqual(['credits', 'iron']);
  });

  test('findRelationPath should return null after exhausting transitive relations', () => {
    const r = new Resources();
    r.addResource('Iron');
    r.addResource('Credits');
    r.addResource('Dirt');
    r.addResource('Metal');
    r.addResourceRelation(10, 'Iron', 50, 'Credits');
    r.addResourceRelation(25, 'Dirt', 50, 'Metal');
    expect(r.findRelationPath('Iron', 'Metal')).toBeNull();
  });

  test('queryRelation should return results using transitive relations', () => {
    const r = new Resources();
    r.addResource('Iron');
    r.addResource('Credits');
    r.addResource('Dirt');
    r.addResourceRelation(10, 'Iron', 50, 'Credits');
    r.addResourceRelation(25, 'Credits', 50, 'Dirt');
    expect(r.queryRelation(20, 'Iron', 'Dirt')).toEqual([
      {resource: 'Iron', amount: 20},
      {resource: 'Credits', amount: 100},
      {resource: 'Dirt', amount: 200},
    ]);
  });

  test('queryRelation should return results using inverse transitive relations', () => {
    const r = new Resources();
    r.addResource('Iron');
    r.addResource('Credits');
    r.addResource('Dirt');
    r.addResourceRelation(10, 'Iron', 50, 'Credits');
    r.addResourceRelation(25, 'Credits', 50, 'Dirt');
    expect(r.queryRelation(200, 'Dirt', 'Iron')).toEqual([
      {resource: 'Dirt', amount: 200},
      {resource: 'Credits', amount: 100},
      {resource: 'Iron', amount: 20},
    ]);
  });

  test('queryRelation should return null after exhausting transitive relations', () => {
    const r = new Resources();
    r.addResource('Iron');
    r.addResource('Credits');
    r.addResource('Dirt');
    r.addResource('Copper');
    r.addResourceRelation(10, 'Iron', 50, 'Credits');
    r.addResourceRelation(25, 'Dirt', 50, 'Copper');
    expect(r.queryRelation(200, 'Dirt', 'Iron')).toBeNull();
  });
});
