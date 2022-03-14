// // Замените на свой API-ключ
// var token = "7fd18aaabd7d53ffa4846e4521c1f736c13490eb";

// function join(arr /*, separator */) {
//   var separator = arguments.length > 1 ? arguments[1] : ", ";
//   return arr
//     .filter(function (n) {
//       return n;
//     })
//     .join(separator);
// }

// function typeDescription(type) {
//   var TYPES = {
//     INDIVIDUAL: "Индивидуальный предприниматель",
//     LEGAL: "Организация",
//   };
//   return TYPES[type];
// }

// function showSuggestion(suggestion) {
//   console.log(suggestion);
//   var data = suggestion.data;
//   if (!data) return;

//   $("#type").text(typeDescription(data.type) + " (" + data.type + ")");

//   if (data.name) {
//     $("#name_short").val(data.name.short_with_opf || "");
//     $("#name_full").val(data.name.full_with_opf || "");
//   }

//   $("#inn_kpp").val(join([data.inn, data.kpp], " / "));

//   if (data.address) {
//     var address = "";
//     if (data.address.data.qc == "0") {
//       address = join([data.address.data.postal_code, data.address.value]);
//     } else {
//       address = data.address.data.source;
//     }
//     $("#address").val(address);
//   }
// }

// $("#party").suggestions({
//   token: token,
//   type: "PARTY",
//   count: 5,
//   /* Вызывается, когда пользователь выбирает одну из подсказок */
//   onSelect: showSuggestion,
// });

var token = "5c9efac9bc9d22cac10e7d5cdd6aaf528a4129bc";
let party = document.getElementById("party");
let url = "https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/party";
let body = { query: "" };

var options = {
  method: "POST",
  mode: "cors",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: "Token " + token,
  },
  body: JSON.stringify(body),
};

async function getData(inn) {
  options.body = JSON.stringify({ query: inn });
  let response = await fetch(url, options);
  return await response.json();
}

async function Suggestions(e) {
  let result = await getData(e.target.value);

  if (result.suggestions.length === 0) {
    setDate(undefined);
  } else if (result.suggestions.length === 1) {
    console.log("result.length === 1");
    setDate(result.suggestions[0]);
    deleteSuggestions();
  } else {
    createSuggestions(result.suggestions);
  }
}

// Для мобильного и десктопа разные события
if (
  /Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(
    navigator.userAgent
  )
) {
  party.addEventListener("input", Suggestions);
} else {
  party.addEventListener("keyup", Suggestions);
}

// Создание подсказок
const createSuggestions = (arrSug) => {
  console.log("массив подсказок ", typeof arrSug, arrSug);

  deleteSuggestions();

  // Создать новый
  party.setAttribute("list", "suggestions");
  let datalist = document.createElement("datalist");
  datalist.setAttribute("id", "suggestions");
  party.after(datalist);

  // Создание списка подсказок
  Array.from(arrSug).forEach((element, index) => {
    const option = document.createElement("option");
    option.value = element.value;
    datalist.append(option);
  });
};

// Удалить тег с подсказками, если есть
const deleteSuggestions = () => {
  const suggestions = document.getElementById("suggestions");
  if (suggestions) {
    suggestions.parentNode.removeChild(suggestions);
  }
};
const setDate = (obj) => {
  console.log("setData ", obj);
  if (obj === undefined) {
    document.getElementById("name_short").value = "";
    document.getElementById("name_full").value = "";
    document.getElementById("inn_kpp").value = "";
    document.getElementById("address").value = "";
  } else {
    if (obj.data) {
      document.getElementById("name_short").value = obj.data.name.short;
      document.getElementById("name_full").value = obj.data.name.full;
      document.getElementById(
        "inn_kpp"
      ).value = `${obj.data.inn} / ${obj.data.kpp}`;
      document.getElementById("address").value = obj.data.address.value;
    }
  }
};
