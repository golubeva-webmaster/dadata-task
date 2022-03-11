// API-ключ
var token = "1158e831e542a485ce1ff5ed5084e110c5d8874a";

// function join(arr ) { // , separator
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
//   onSelect: showSuggestion, // Вызывается, когда пользователь выбирает одну из подсказок
// });

let party = document.getElementById("party");
//let url = "https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/party";
let url = "https://suggestions.dadata.ru/suggestions/api/4_1/rs/findById/party";
let body = { query: "3446019558" };

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

const getDataByINN = (text) => {
  options.body = JSON.stringify({ query: text });
  // console.log("options: ", options);
  fetch(url, options)
    .then((response) => response.text())
    .then((result) => {
      console.log(JSON.parse(result));
      if (result.length > 0) {
        console.log(JSON.parse(result.suggestions[0]));
        // console.log(JSON.parse(result.name));
      }
    })
    .catch((error) => console.log("error", error));
};

party.addEventListener("input", function (e) {
  // console.log("INN: ", e.target.value);
  getDataByINN(e.target.value);
});
