import eventBus from "./EventBus";
describe("EventBus", () => {
  it("creates and triggers events successfuly", () => { 
    const addEventListenerSpy = jest.spyOn(document, 'addEventListener');
    const dispatchEventSpy = jest.spyOn(document, 'dispatchEvent');
    const removeEventSpy = jest.spyOn(document, 'removeEventListener');
    const resultText = "Testing passed!";
    const eFunc = () => resultText;
    eventBus.on("test", eFunc);
    expect(addEventListenerSpy).toHaveBeenCalled();
    eventBus.dispatch("test");
    expect(dispatchEventSpy).toHaveBeenCalledWith(expect.any(Event));
    eventBus.remove("test", eFunc);
    expect(removeEventSpy).toHaveBeenCalled();
  });
});
