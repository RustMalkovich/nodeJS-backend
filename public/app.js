document.addEventListener("click", (event) => {
  if (event.target.dataset.type === "remove") {
    const id = event.target.dataset.id;

    remove(id).then(() => {
      event.target.closest("li").remove();
    });
  }

  if (event.target.dataset.type === "edit") {
    const id = event.target.dataset.id;

    const title = prompt(
      "Введите новое название:",
      event.target.previousElementSibling.outerText
    );

    if (!title) return;

    event.target.previousElementSibling.textContent = title;

    update(id, title);
  }
});

async function remove(id) {
  await fetch(`/${id}`, { method: "DELETE" });
}

async function update(id, value) {
  return fetch(`/${id}`, {
    method: "PUT",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({ title: value, id }),
  });
}
