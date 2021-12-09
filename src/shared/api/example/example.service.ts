import { apiInstance } from '../api';

const route = '/example'; // /api/example

export class ExampleService {
  public static fetchExample() {
    apiInstance.get(route);
  }
}
