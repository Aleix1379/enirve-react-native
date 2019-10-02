export class EventsService {
  static subscriptions = {};

  constructor() {}

  static publish(topic, eventData) {
    if (this.subscriptions[topic]) {
      EventsService.subscriptions[topic](eventData);
    } else {
      console.warn(`There is no subscription for the topic: ->${topic}<-`);
    }
  }

  static subscribe(topic, handler) {
    EventsService.subscriptions[topic] = handler;
  }

  static unsubscribe(topic) {
    delete EventsService.subscriptions[topic];
  }
}
