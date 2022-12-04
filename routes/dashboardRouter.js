const express = require('express');
const DashboardService = require('../services/dashboardService');

const router = express.Router();

const service = new DashboardService();

router.post(
  '/top-ten-products',

  async (req, res, next) => {
    try {
      const { topTenDate } = req.body;
      const user = await service.getTop10MostSeledProducts(topTenDate);
      res.status(201).json(user);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  '/top-ten-less-products',

  async (req, res, next) => {
    try {
      const { topTenDate } = req.body;
      const user = await service.getTop10LessSoldProducts(topTenDate);
      res.status(201).json(user);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  '/monthly-income',

  async (req, res, next) => {
    try {
      const { monthlyIncomeDate } = req.body;
      const user = await service.getMonthlyIncome(monthlyIncomeDate);
      res.status(201).json(user);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  '/daily-sales',

  async (req, res, next) => {
    try {
      const { date } = req.body;
      const user = await service.getDailySales(date);
      res.status(201).json(user);
    } catch (error) {
      next(error);
    }
  }
);
router.post(
  '/registered-users-per-day',

  async (req, res, next) => {
    try {
      const { usersDate } = req.body;
      const user = await service.getRegisteredUsersPerDay(usersDate);
      res.status(201).json(user);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
