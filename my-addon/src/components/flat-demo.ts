import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';

export default class FlatDemo extends Component {
  @tracked active = false;

  flip = () => (this.active = !this.active);
}
