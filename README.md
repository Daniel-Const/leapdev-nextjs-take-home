## LEAP Dev NextJS Take Home Test

This is a very basic Book Store with static data and simple CRUD support.

Push this up to a public Github repository please. We will assess both code and commits in order to discern how you approach problem-solving.

Please do not use AI in any way, shape, or form.

---

Please implement the following:

1. Use a component library to make the UI and UX more appealing and user friendly.

[Explain here why you chose the one you did]

2. Implement dark mode that includes a switcher to go back to light mode.

3. Deleting a book displays a JavaScript alert. Replace this with modern UX.

4. Add a rating system that goes up to 5 stars.

5. There is a bug in the code. Find it and fix it.

---

[Explain here what the bug was and how you fixed it]

There is a bug that prevents users from editing books.

Replication steps:

1. Pick any book from the gallery and click edit.
2. Change any of the data in the book
3. Press update book
4. The book data will have not changed (Can confirm further by clicking edit again)

The bug is caused by the following piece of code.

```typescript
const handleUpdateBook = (updatedBook: Partial<Book>) => {
  setBooks(
    books.map((book) =>
      book.id === selectedBook?.id ? { ...updatedBook, ...book } : book
    )
  );
  setIsModalOpen(false);
  setSelectedBook(undefined);
};
```

When setting the new book data, `{...updatedBook, ...book}` will overwrite the new book with old data from `book`. This is because using the spread operator in an object will overwrite fields with the same key in the order they show in the object.

For example:

```typescript
const first = { a: "hello" };
const second = { a: "world" };
console.log({ ...first, ...second });

// output
{
  a: "world";
}
```

Because 'second' is spread afterwards it overwrites the 'first' objects value at
the shared key 'a'

Changing the order like so `{...book, ...updatedBook}` should resolve the issue.

---

Good luck and have fun!
