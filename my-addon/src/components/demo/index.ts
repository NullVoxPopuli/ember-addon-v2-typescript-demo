import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';

// @ts-expect-error
import FlipButton from './button';

export default class Demo extends Component {
  Button = FlipButton;

  @tracked active = false;

  flip = () => (this.active = !this.active);
}
