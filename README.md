# VisitorRegistor

## 1. Functions
## 2. Architecture
We follows the Facebook's ReactJS and Flux ["An Application Architecture for React"](http://facebook.github.io/react/blog/2014/05/06/flux.html) framework for this web app. The design approach is very similar to [TodoMVC tutorial](http://facebook.github.io/flux/docs/todo-list.html).

## 3.Views
Views in ReactJS are called components, they are
- Header.react.js
- MainSection.react.js
- VisitorInfoForm.react.js
- VistorInfoList.react.js
- Footer.react.js
- The UI Design is as follows...(Note: the image needs to be update)

## 4. Actions (VisitorActiion.js)
Actions are trigged from view by user interactions
- CREATE: Create a visitor informatin entry in the database upon user submission
- UPDATE: Update a single entry
- DELETE: Delete a single entry

## 5. Dispacher  (AppDispatcher.js)
This is to create a dispatcher, it will dispach the Action with Action Type and payload to the callbacks that registered. The registration is done in the Store.

## 6. Store (VisitorStore.js)
It contains the actual implementations for the actions callbacks as well as the registration for the dispatcher.


