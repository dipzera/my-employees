"use strict";
const Employee = require("../models/employee.model");

exports.findAll = function (req, res) {
  Employee.findAll(function (err, employee) {
    console.log("controller");
    if (err) res.send(err);
    console.log("res", employee);
    res.send(employee);
  });
};

exports.create = function (req, res) {
  const new_employee = new Employee(req.body);

  // handles null error
  if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    res
      .status(400)
      .send({ ErrorCode: 400, ErrorMessage: "Please provide required field" });
  } else {
    Employee.create(new_employee, function (err, employee) {
      if (err) res.send(err);
      res.json({
        ErrorCode: 0,
        ErrorMessage: "Employee added successfully!",
        id: employee,
      });
    });
  }
};

exports.findById = function (req, res) {
  console.log(req.params.id);
  Employee.findById(req.params.id, function (err, employee) {
    if (err) res.send(err);
    res.json(employee);
  });
};

exports.update = function (req, res) {
  if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    res
      .status(400)
      .send({ ErrorCode: 400, ErrorMessage: "Provide required fields" });
  } else {
    Employee.update(
      req.params.id,
      new Employee(req.body),
      function (err, employee) {
        if (err) res.send(err);
        res.json({
          ErrorCode: 0,
          ErrorMessage: "Employee successfully updated",
        });
      }
    );
  }
};

exports.delete = function (req, res) {
  Employee.delete(req.params.id, function (err, employee) {
    if (err) res.send(err);
    res.json({ ErrorCode: 0, ErrorMessage: "Employee deleted!" });
  });
};
