const app = angular.module("app", []);
let env = {};
if (window) {
  env = window.__env;
}

app.controller("userController", [
  "$scope",
  function ($scope) {
    $scope.userName = env.BEURL;
    $scope.welcomeMessage = `Welcome to The Applications`;
    if (localStorage.getItem("token")) window.location.href = "/home";

    $scope.register = function () {
      window.location.href = "/register";
    };
    $scope.login = () => {
      window.location.href = "/login";
    };
  },
]);

app.controller("loginController", [
  "$scope",
  function ($scope) {
    $scope.email = "";
    $scope.password = "";

    $scope.PAGE = "LOGIN";

    $scope.loginExec = () => {
      axios({
        url: `${env.BEURL}/login`,
        method: "POST",
        data: {
          email: $scope.email,
          password: $scope.password,
        },
      })
        .then((result) => {
          localStorage.setItem("token", result.data.token);
          return axios({
            url: `${env.BEURL}/balance`,
            method: "GET",
            data: {
              email: $scope.email,
              password: $scope.password,
            },
            headers: {
              token: localStorage.getItem("token"),
            },
          });
        })
        .then((result) => {
          localStorage.setItem("name", result.data.data.name);
          localStorage.setItem("phoneNumber", result.data.data.phoneNumber);
          localStorage.setItem("currentBalance", result.data.data.balance);
          window.location.href = "/home";
        })
        .catch((err) => {
          alert(err.response.data.error);
        });
    };

    $scope.home = () => {
      window.location.href = "/";
    };
    $scope.register = () => {
      window.location.href = "/register";
    };
  },
]);

app.controller("registerController", [
  "$scope",
  function ($scope) {
    $scope.PAGE = "Register";
    $scope.name = "";
    $scope.email = "";
    $scope.password = "";
    $scope.phoneNumber = "";
    $scope.registerExec = () => {
      axios({
        url: `${env.BEURL}/register`,
        method: "POST",
        data: {
          email: $scope.email,
          password: $scope.password,
          name: $scope.name,
          phoneNumber: $scope.phoneNumber,
        },
      })
        .then((result) => {
          window.location.href = "/login";
        })
        .catch((err) => {
          alert(err.response.data.error);
        });
    };
    $scope.login = () => {
      window.location.href = "/login";
    };
    $scope.home = () => {
      window.location.href = "/";
    };
  },
]);

app.controller("homeController", [
  "$scope",
  function ($scope) {
    $scope.PAGE = "Home";
    $scope.name = localStorage.getItem("name");
    $scope.phoneNumber = localStorage.getItem("phoneNumber");
    $scope.currentBalance = localStorage.getItem("currentBalance");
    if (!localStorage.token) window.location.href("/");
    $scope.addBalance = 0;
    $scope.addBalanceExec = () => {
      axios({
        url: `${env.BEURL}/balance`,
        method: "POST",
        data: {
          balance: $scope.addBalance,
        },
        headers: {
          token: localStorage.getItem("token"),
        },
      })
        .then((result) => {
          localStorage.setItem("currentBalance", result.data.data.balance);
          $scope.currentBalance = result.data.data.balance;
          window.location.reload();
        })
        .catch((err) => {
          alert(err.response.data.error);
        });
    };
    $scope.logOut = () => {
      localStorage.clear();
      window.location.href = "/";
    };
  },
]);
