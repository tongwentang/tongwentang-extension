import { FC, useCallback } from 'react';
import { DicObj } from 'tongwen-core/dictionaries';
import { i18n } from '../../../service/i18n/i18n';
import { Button } from '../../components';

const WordEntryRow: FC<{
  index: number;
  entry: [string, string];
  onEdit: (entry: [string, string]) => void;
  onRemove: (key: string) => void;
}> = ({ index, entry, onEdit: handleEdit, onRemove: handleRemove }) => {
  const edit = useCallback(() => handleEdit(entry), [entry]);
  const remove = useCallback(() => handleRemove(entry[0]), [entry]);

  return (
    <tr>
      <td>{index + 1}</td>
      <td>{`${entry[0]} => ${entry[1]}`}</td>
      <td>
        <Button type="primary" onClick={edit}>
          {i18n.getMessage('MSG_EDIT')}
        </Button>
      </td>
      <td>
        <Button type="error" onClick={remove}>
          {i18n.getMessage('MSG_DELETE')}
        </Button>
      </td>
    </tr>
  );
};

export const WordEntryList: FC<{
  words: DicObj;
  onEdit: (entry: [string, string]) => void;
  onRemove: (key: string) => void;
}> = ({ words, onRemove: handleRemove, onEdit: handleEdit }) => {
  return (
    <table className="table table-striped table-hover">
      <thead>
        <tr>
          <td>#</td>
          <td>{i18n.getMessage('MSG_WORD')}</td>
          <td></td>
          <td></td>
        </tr>
      </thead>
      <tbody>
        {Object.entries(words).map((entry, index) => (
          <WordEntryRow key={entry[0]} index={index} entry={entry} onEdit={handleEdit} onRemove={handleRemove} />
        ))}
      </tbody>
    </table>
  );
};
