// Copyright (c) 2021 Steffen Stein <mail@steffenstein.com> For LICENSE see docs/LICENSE

export const schema = [
  {
    component: "h3",
    class: "text-2xl mb-4",
    children: "Order pizza"
  },
  {
    type: "select",
    label: "Pizza size",
    name: "size",
    placeholder: "Select a size",
    options: {
      small: "Small",
      large: "Large",
      extra_large: "Extra Large"
    },
    validation: "required"
  },
  {
    component: "div",
    class: "flex",
    children: [
      {
        name: "cheese",
        label: "Cheese options",
        type: "checkbox",
        validation: "min:1,length",
        options: {
          mozzarella: "Mozzarella",
          feta: "Feta",
          parmesan: "Parmesan",
          extra: "Extra cheese"
        },
        "outer-class": ["w-1/2"]
      },
      {
        name: "toppings",
        label: "Toppings",
        type: "checkbox",
        validation: "min:2,length",
        options: {
          salami: "Salami",
          prosciutto: "Prosciutto",
          avocado: "Avocado",
          onion: "Onion"
        },
        "outer-class": ["w-1/2"]
      }
    ]
  },
  {
    component: "div",
    class: "flex",
    children: [
      {
        type: "select",
        name: "country_code",
        label: "Code",
        value: "1",
        "outer-class": ["w-1/4 mr-4"],
        options: {
          "1": "+1",
          "49": "+49",
          "55": "+55"
        }
      },
      {
        type: "text",
        label: "Phone number",
        name: "phone",
        inputmode: "numeric",
        pattern: "[0-9]*",
        validation: "matches:/^[0-9-]+$/",
        "outer-class": ["flex-grow"],
        "validation-messages": {
          matches: "Phone number should only include numbers and dashes."
        }
      }
    ]
  },
  {
    type: "submit",
    label: "Order pizza"
  }
];
