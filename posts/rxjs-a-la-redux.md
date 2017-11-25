RxJS a la Redux
===============

Handling state is one of the most ubiquitous problems in software applications and there are a lot of ways to peel this banana. One way of doing this that have got a lot of attention is **[Redux](https://redux.js.org/)**, mainly on the **[React](https://reactjs.org/)** ecosystem.

There are, though, some attempts to use the same techniques using **[Reactive Extensions](http://reactivex.io/rxjs/)** (RxJs) and that's what I want to cover in this post.

## Why is state handling so complicated in UI?

In contrast to other domains, in front end applications the state is always changing, users are like little critters clicking, scrolling, typing, taping, talking and who knows what else, and they do all these at the same time; and, just to add more noise, interactions started by the system itself are often asynchronous or handled in different threads.

## Keep it in pieces

A very common and naive approach is to handle local state, if a checkbox is clicked, it keeps its state and eventually someone else will ask about it... or not. The problem with this approach is that it is extremely difficult to build systems that react coordinately to clicks and AJAX responses, the more elements a user can interact with, the more complex are the state interactions.

## The imperative way: x = 2; x = 3

Handling local state is commonly implemented in an imperative way, when a click occurs the system sets the value of some variable and eventually some other part of the system will read that value. The obvious issue here is: how do others parts of the system knows there was a change in the state? The next problem is, what if others are tracking the same state, how do you ensure there is only one copy of the data you need to use and if you have many copies, how do you keep them in sync?

## Setters and dependencies

An object oriented approach would be to use setters and getters instead of plain mutable properties, then, if someone sets a value, the object can notify others about the change, but in order to do this, objects need generic ways to know how are those others that they need to notify on changes. One approach is to use factories or even better, dependency injection. If you have worked with Angular, you already know how tricky can be to use and debug a dependency injection issue on large code bases.

## State _a la Lord of the Rings_

Another idea is to use a global state. Every piece in the system writes to the same thing and reads from it. This at least solves the problem of information synchronization. Everybody uses the same thing all the time, but you still have the problem of telling others about a change when it occurs.

Again, using setters can help, and dependency injection is not such a big issue if you only have one huge state object, but it does gets tricky.

## Subscriptions and callbacks

One alternative to this notification mess is to notify everybody all the time whenever there is a change, regardless of what change it is, and letting consumers to deal with the values. The good part of this is that there is no need for dependency injection, interested pieces of software can _subscribe_ to changes and then deal with them.

Here, again, we have a bunch of options, but in general all of them work very similarly: Subscribers register a delegate to the state changes and this callback gets invoked every time there is a new value. If the new state is actually sent as an argument in the callback, subscribers don't even need to know anything else about the state, they just get it every time.

## State as an Array: The Stream way

If you think on this as actually having different copies of the state, each having the new values on every round, you can always think about it as an array of states, every entry is an evolution over the last one after some side effect occurred outside the system (a user did something, an AJAX call returned some values, a websocket sent new data, etc.):

```javascript
[S1, S2, S3, S4, ...]
```

And o course, if you have an array, you can traverse it:

```javascript
states.forEach(state => { /* Do something fancy */ })
```

But what happens if there is an error? You can always do what node callbacks do, send two arguments: a possible error (or `undefined`) and a succesful value; or alternatively provide two callbacks, one for handling the success case and one for handling the error one:

```javascript
states.forEachOrError(
    state => { /* Do something fancy */ },
    error => { /* Call the Batman */    })
```

There is only one caveat here. If there was an error that means there was an error on the hole thing handling the state, there is no easy way to tell what will happen next and this is way it is safer to just close the door for new states: After an error, no other callback will be invoked.

There is a third case that may or may not actually happen, but if it does happen, you want to know about it, for whatever reason there are no more states available, going back to our array metaphor, that is equivalent to reach the end of the array. If we follow what we did for errors, we can do the same for this case:

```javascript
states.forEachOrErrorOrComplete(
    state => { /* Do something fancy */ },
    error => { /* Call the Batman */    },
    ()    => { /* The party is over */  })
```

And this is exactly the signature we know on Observables:

```javascript
obs.subscribe(
    state => { /* Do something fancy */ },
    error => { /* Call the Batman */    },
    ()    => { /* The party is over */  })
```

One cool thing about Observables in RxJs is that they have a nice algebra to transform them into Observables of different data types than the original one when they where created. From the consumer point of view, this approach works perfectly, you can _project_ the `state` into something you use and remove all the values you don't care about, you are notified when things change, and you can transform things into more suitable data types.

We have a problem though. How do you get this `states` Observable and how do you change the state in it.

## Everything is a Stream

The first thing to notice is that you can think on any side effect as a stream: A stream of clicks, scrolling events, key press events, AJAX response, WebSockets events, etc.

The second one is that all these events will end up in transformations of your state or in triggers for new events:

* A click on the navigation bar will become in a new control to be loaded by the router
* Keys being pressed will become in a new value at some property of you state like the user name, a password or some other data
* An AJAX response will cause a list of orders to be updated in the state

One solution, the **Redux** one, is to combine all these events into a single stream of pairs: The name of **action** the action you want to perform, like `Update Order List` and the **payload** of that action, like a "list of orders" value.

The fact that this approach works is evident after seeing the number of users of **Redux**. There are some details I don't like about this though:

* It's difficult to type check:
    * Action names are strings and you can have all kind of typos only detected at run time
    * Payload can be all kind of things, even using Sum types you will have a hard time asserting that things are what they need to be on a particular action
* You are limited to use reducers configured in advance which brings you back to the hard coding or dependency injection kind of thing

## Composin streams

One alternative is to try to use Stream composition instead of _ad-hoc_ `dispatch` statements on the stream.

Each action is, at the end, a function that takes a state and returns you a new state with some changes. Starting on the **Redux** idea:

```
action :: String -> Payload -> State -> State 
```

You start with a `name`, from it you get a function that takes a `payload` and a `State` and returns you a `State`. From this, the only thing you don't really need is the starting point, if you know how to convert a Payload into a function `State -> State` then you don't need that extra routing step:

```
action :: Payload -> State -> State 
```

But if you think about it, the only thing you really need about an action is that it gives you a new state starting from another one:

```
action :: State -> State 
```

If you were able to create a stream of Actions, and you where given an initial state, you would be able to provide a new Stream of states, how? easy, just reducing your states with your actions:

```javascript
const stateStream = actions.scan((state, action) => action(state), initialState);
```

We use `scan` instead of `reduce` because we want a new event on every _reduction_ step. But at the end they work pretty much the same.

So far so good, we managed to have our stream of states but we still need to get the stream of actions from somewhere. An easy way to do that is to convert other streams into actions:

```javascript
const userNameActions = 
    KeyUpEvents
        .map(getUserNameFromEvent)
        .map(userName => state => state.copy({userName: userName}));
```

And if you have a stream of actions, you can now safely combine it with other streams of actions:

```javascript
const allActions = actions1.merge(actions2);
```

Which hints us on what we need to do to get as a minimal implementation:

```typescript
// S is the type of our state
//
// actions is a Subject to broadcast any custom action, 
// but you can combine them before if you need so.
const actions = new Subject();
const stateStream = 
    // We start our stream of actions with the Identity function
    Observable.prototype.merge.apply(Observable.of((s:S) => s), otherActionsArray)
            // And merge it with the Never Observable to ensure our stream 
            // will never complete
            .merge(Observable.never())
            // We finally merge it with our subject of actions
            .merge(this.actions)
            // And convert it to a stream of states
            .scan((state:S, action: Action<S>) => action(state), initialState)
            // Finally we convert it into a stream that can be multicasted 
            // and that replies the last state to new subscribers
            .multicast(new ReplaySubject(1)).refCount();
```

And that's pretty much all. Enjoy your state :)

References
----------

* MichalZalecki, **connect-rxjs-to-react** <https://github.com/MichalZalecki/connect-rxjs-to-react>
* MichalZalecki, **Use RxJS with React** <https://michalzalecki.com/use-rxjs-with-react>
* Rudi Yardley, **Redux in a single line of code with RxJS** <http://rudiyardley.com/redux-single-line-of-code-rxjs>
* Matti Lankinen **Containers Are Dead. Long Live Observable Combinators** <https://medium.com/@milankinen/containers-are-dead-long-live-observable-combinators-2cb0c1f06c96>