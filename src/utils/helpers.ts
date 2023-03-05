export const submit: (event: Event) => void = (event) => {
  event.preventDefault();
  const form = event.target as HTMLFormElement;
  const values = {};
  form.querySelectorAll('input')
    .forEach((field) => {
      values[field.name] = field.value;
    });

  console.log(values);
};
