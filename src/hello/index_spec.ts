import {SchematicTestRunner, UnitTestTree} from '@angular-devkit/schematics/testing';
import * as path from 'path';
import * as assert from "assert";


const collectionPath = path.join(__dirname, '../collection.json');
const runner = new SchematicTestRunner('schematics', collectionPath);

let appTree: UnitTestTree;

describe('Schematic: Hello', () => {
  beforeEach(() => {
    appTree = runner.runExternalSchematic('@schematics/angular', 'workspace', {});
    appTree = runner.runExternalSchematic('@schematics/angular', 'application', {}, appTree);
  });

  it('should create hello component', () => {
    const options = {name: 'Max'};
    const tree = runner.runSchematic('hello', options, appTree);

    assert(tree.files.includes('/projects/bar/src/app/hello-max/hello-max.component.ts'));
  });
});
