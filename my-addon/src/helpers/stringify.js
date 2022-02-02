import { helper } from '@ember/component/helper';

export default helper(([input]) => {
  return JSON.stringify(input, null, 2);
});
