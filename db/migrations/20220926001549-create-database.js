'use strict';
const { PERMISSIONS_TABLE } = require('./../models/permissionsModel');
const { DataTypes, Sequelize } = require('sequelize');
const { MODULES_TABLE } = require('../models/modulesModel');
const { ROLES_TABLE } = require('./../models/rolesModel');
const {
  ROLES_PERMISSIONS_TABLE,
} = require('./../models/rolesPermissionsModel');
const { USERS_TABLE } = require('./../models/usersModel');
const { CLIENTS_TABLE } = require('./../models/clientsModel');
const { SALES_TABLE } = require('./../models/salesModel');
const { PROVIDERS_TABLE } = require('../models/providersModel');
const { BUYS_TABLE } = require('../models/buysModel');
const { BUYS_DETAILS_TABLE } = require('../models/buysDetailsModel');
const { PRODUCTS_TABLE } = require('../models/productsModel');
const { SALES_DETAILS_TABLE } = require('../models/salesDetailsModel');
const { ORDERS_TABLE } = require('../models/ordersModel');
const { ORDERS_DETAILS_TABLE } = require('../models/ordersDetailsModel');
const {
  QUOTATIONS_DETAILS_TABLE,
} = require('../models/quotationsDetailsModel');
const { QUOTATION_TABLE } = require('../models/quotationModel');
const { CATEGORIES_TABLE } = require('./../models/categoriesModel');
const { VEHICLES_TABLE } = require('./../models/vehiclesModel');
const { BRANDS_TABLE } = require('./../models/brandsModel');
const { USERS_HELP_TABLE } = require('./../models/usersHelpModel');
const { PRODUCTS_VEHICLES_TABLE } = require('../models/productsVehiclesModel');

module.exports = {
  async up(queryInterface) {
    await queryInterface.createTable(CATEGORIES_TABLE, {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      name: {
        allowNull: false,
        type: DataTypes.STRING,
        unique: true,
      },
    });
    await queryInterface.createTable(BRANDS_TABLE, {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      name: {
        allowNull: false,
        type: DataTypes.STRING(50),
        unique: true,
      },
    });
    await queryInterface.createTable(MODULES_TABLE, {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      name: {
        allowNull: false,
        type: DataTypes.STRING(50),
        unique: true,
      },
      description: {
        allowNull: false,
        type: DataTypes.STRING(500),
        unique: false,
      },
    });
    await queryInterface.createTable(USERS_HELP_TABLE, {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      idModule: {
        allowNull: false,
        type: DataTypes.INTEGER,
        unique: true,
        field: 'id_module',
        references: {
          model: MODULES_TABLE,
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      videoURL: {
        allowNull: false,
        unique: false,
        field: 'video_url',
        type: DataTypes.STRING,
      },
    });

    await queryInterface.createTable(PERMISSIONS_TABLE, {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      idModule: {
        allowNull: false,
        type: DataTypes.INTEGER,
        unique: false,
        field: 'id_module',
        references: {
          model: MODULES_TABLE,
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      name: {
        allowNull: false,
        type: DataTypes.STRING(50),
        unique: false,
      },
    });
    await queryInterface.createTable(ROLES_TABLE, {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      name: {
        allowNull: false,
        type: DataTypes.STRING(50),
        unique: false,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATEONLY,
        defaultValue: Sequelize.NOW,
        unique: false,
        field: 'created_at',
      },
      status: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
        unique: false,
        defaultValue: true,
      },
    });
    await queryInterface.createTable(ROLES_PERMISSIONS_TABLE, {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      idRol: {
        allowNull: false,
        type: DataTypes.INTEGER,
        unique: false,
        field: 'id_rol',
        references: {
          model: ROLES_TABLE,
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      idPermissions: {
        allowNull: false,
        type: DataTypes.INTEGER,
        unique: false,
        field: 'id_permissions',
        references: {
          model: PERMISSIONS_TABLE,
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
    });
    await queryInterface.createTable(VEHICLES_TABLE, {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      name: {
        allowNull: false,
        type: DataTypes.STRING,
        unique: false,
      },
      model: {
        allowNull: true,
        type: DataTypes.STRING,
        unique: false,
      },
      idBrand: {
        allowNull: false,
        type: DataTypes.INTEGER,
        unique: false,
        field: 'id_brand',
        references: {
          model: BRANDS_TABLE,
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
    });
    await queryInterface.createTable(PRODUCTS_TABLE, {
      id: {
        allowNull: false,
        primaryKey: true,
        unique: true,
        type: DataTypes.STRING(25),
      },
      idCategory: {
        allowNull: false,
        type: DataTypes.INTEGER,
        unique: false,
        field: 'id_category',
        references: {
          model: CATEGORIES_TABLE,
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      photo: {
        allowNull: false,
        type: DataTypes.STRING(200),
        unique: false,
      },
      name: {
        allowNull: false,
        type: DataTypes.STRING(50),
        unique: false,
      },
      amount: {
        allowNull: true,
        type: DataTypes.INTEGER,
        unique: false,
      },
      price: {
        allowNull: false,
        type: DataTypes.FLOAT,
        unique: false,
      },
      description: {
        allowNull: false,
        type: DataTypes.STRING(500),
        unique: false,
      },
      state: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
        unique: false,
      },
      iva: {
        allowNull: false,
        type: DataTypes.FLOAT,
        unique: false,
      },
    });
    await queryInterface.createTable(PRODUCTS_VEHICLES_TABLE, {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      idProduct: {
        type: DataTypes.STRING(25),
        allowNull: false,
        unique: false,
        field: 'id_product',
        references: {
          model: PRODUCTS_TABLE,
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      idVehicle: {
        allowNull: false,
        type: DataTypes.INTEGER,
        unique: false,
        field: 'id_vehicle',
        references: {
          model: VEHICLES_TABLE,
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
    });
    await queryInterface.createTable(PROVIDERS_TABLE, {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      nit: {
        allowNull: false,
        type: DataTypes.STRING,
        unique: true,
      },
      companyName: {
        allowNull: false,
        type: DataTypes.STRING,
        unique: false,
        field: 'company_name',
      },
      contactName: {
        allowNull: false,
        type: DataTypes.STRING,
        unique: false,
        field: 'contact_name',
      },
      telephone: {
        allowNull: false,
        type: DataTypes.STRING,
        unique: false,
      },
      adress: {
        allowNull: false,
        type: DataTypes.STRING,
        unique: false,
      },
      email: {
        allowNull: false,
        type: DataTypes.STRING,
        unique: false,
      },
      country: {
        allowNull: false,
        type: DataTypes.STRING,
        unique: false,
      },
    });

    await queryInterface.createTable(USERS_TABLE, {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      idRol: {
        allowNull: false,
        type: DataTypes.INTEGER,
        unique: false,
        field: 'id_rol',
        references: {
          model: ROLES_TABLE,
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      email: {
        allowNull: false,
        type: DataTypes.STRING,
        unique: true,
      },
      password: {
        allowNull: false,
        type: DataTypes.STRING,
        unique: false,
      },
      status: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
        unique: false,
      },
      name: {
        allowNull: false,
        type: DataTypes.STRING,
        unique: false,
      },
      lastname: {
        allowNull: false,
        type: DataTypes.STRING,
        unique: false,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATEONLY,
        defaultValue: Sequelize.NOW,
        field: 'created_at',
        unique: false,
      },
    });

    await queryInterface.createTable(CLIENTS_TABLE, {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      idUser: {
        allowNull: true,
        type: DataTypes.INTEGER,
        unique: false,
        field: 'id_user',
        references: {
          model: USERS_TABLE,
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      name: {
        allowNull: false,
        type: DataTypes.STRING(100),
        unique: false,
      },
      lastname: {
        allowNull: false,
        type: DataTypes.STRING(200),
        unique: false,
      },
      documentType: {
        allowNull: false,
        type: DataTypes.STRING(100),
        unique: false,
        field: 'document_type',
      },
      document: {
        allowNull: false,
        type: DataTypes.STRING(50),
        unique: false,
      },
      telephone: {
        allowNull: false,
        type: DataTypes.STRING(20),
        unique: false,
      },
      email: {
        allowNull: false,
        type: DataTypes.STRING(100),
        unique: false,
      },
      country: {
        allowNull: false,
        type: DataTypes.STRING(100),
        unique: false,
      },
      department: {
        allowNull: false,
        type: DataTypes.STRING(100),
        unique: false,
      },
      city: {
        allowNull: false,
        type: DataTypes.STRING(100),
        unique: false,
      },
      neightboorhood: {
        allowNull: false,
        type: DataTypes.STRING(100),
        unique: false,
      },
      address: {
        allowNull: false,
        type: DataTypes.STRING(200),
        unique: false,
      },
      indications: {
        allowNull: false,
        type: DataTypes.STRING(500),
        unique: false,
      },
    });
    await queryInterface.createTable(SALES_TABLE, {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      idClient: {
        allowNull: false,
        type: DataTypes.INTEGER,
        unique: false,
        references: {
          model: CLIENTS_TABLE,
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      saleDate: {
        allowNull: false,
        type: DataTypes.DATEONLY,
        defaultValue: DataTypes.DATEONLY,
        unique: false,
        fiel: 'sale_date',
      },
      statusSale: {
        allowNull: false,
        type: DataTypes.STRING,
        unique: false,
        fiel: 'status_sale',
      },
      statusPayment: {
        allowNull: false,
        type: DataTypes.STRING,
        unique: false,
        fiel: 'status_payment',
      },
      totalPurchase: {
        allowNull: false,
        type: DataTypes.FLOAT,
        unique: false,
        fiel: 'total_purchase',
      },
    });

    await queryInterface.createTable(BUYS_TABLE, {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      idProvider: {
        allowNull: false,
        type: DataTypes.INTEGER,
        unique: false,
        field: 'id_provider',
        references: {
          model: PROVIDERS_TABLE,
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      date: {
        allowNull: false,
        type: DataTypes.DATEONLY,
        field: 'date_purchase',
        unique: false,
        defaultValue: DataTypes.NOW,
      },
      invoiceNumber: {
        allowNull: false,
        type: DataTypes.STRING,
        unique: false,
        field: 'invoice_number',
      },
      totalPurchase: {
        allowNull: false,
        type: DataTypes.FLOAT,
        unique: false,
        field: 'total_purchase',
      },
      totalIva: {
        allowNull: false,
        type: DataTypes.FLOAT,
        unique: false,
        field: 'total_iva',
    
      },
      totalOtherTaxes: {
        type: DataTypes.FLOAT,
        field: 'total_other_taxes',
      },
      total: {
        allowNull: false,
        type: DataTypes.FLOAT,
        unique: false,
      },
      status: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
        unique: false,
        defaultValue: true,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATEONLY,
        defaultValue: Sequelize.NOW,
        field: 'created_at',
        unique: false,
      },
    });
    await queryInterface.createTable(SALES_DETAILS_TABLE, {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      idSale: {
        allowNull: false,
        type: DataTypes.INTEGER,
        unique: true,
        field: 'id_sale',
        references: {
          model: SALES_TABLE,
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      idProduct: {
        allowNull: false,
        type: DataTypes.STRING(25),
        unique: false,
        field: 'id_product',
        references: {
          model: PRODUCTS_TABLE,
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      amount: {
        allowNull: false,
        type: DataTypes.INTEGER,
        unique: false,
      },
      price: {
        allowNull: false,
        type: DataTypes.FLOAT,
        unique: false,
      },
      iva: {
        allowNull: false,
        type: DataTypes.FLOAT,
        unique: false,
      },
      otherTaxes: {
        allowNull: false,
        type: DataTypes.FLOAT,
        unique: false,
        field: 'other_taxes',
      },
    });
    await queryInterface.createTable(ORDERS_TABLE, {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      idClient: {
        allowNull: false,
        type: DataTypes.INTEGER,
        unique: false,
        references: {
          model: CLIENTS_TABLE,
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      saleDate: {
        allowNull: false,
        type: DataTypes.DATEONLY,
        defaultValue: DataTypes.DATEONLY,
        unique: false,
        fiel: 'sale_date',
      },
      statusSale: {
        allowNull: false,
        type: DataTypes.STRING,
        unique: false,
        fiel: 'status_sale',
      },
      statusPayment: {
        allowNull: false,
        type: DataTypes.STRING,
        unique: false,
        fiel: 'status_payment',
      },
      totalPurchase: {
        allowNull: false,
        type: DataTypes.FLOAT,
        unique: false,
        fiel: 'total_purchase',
      },
    });
    await queryInterface.createTable(ORDERS_DETAILS_TABLE, {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      idOrder: {
        allowNull: false,
        type: DataTypes.INTEGER,
        unique: true,
        field: 'id_order',
        references: {
          model: SALES_TABLE,
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      idProduct: {
        type: DataTypes.STRING(25),
        allowNull: false,
        unique: false,
        field: 'id_product',
        references: {
          model: PRODUCTS_TABLE,
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      amount: {
        allowNull: false,
        type: DataTypes.INTEGER,
        unique: false,
      },
      price: {
        allowNull: false,
        type: DataTypes.FLOAT,
        unique: false,
      },
      iva: {
        allowNull: false,
        type: DataTypes.FLOAT,
        unique: false,
      },
      otherTaxes: {
        allowNull: false,
        type: DataTypes.FLOAT,
        unique: false,
        field: 'other_taxes',
      },
    });

    await queryInterface.createTable(QUOTATION_TABLE, {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      idUser: {
        allowNull: false,
        type: DataTypes.INTEGER,
        unique: false,
        field: 'id_user',
        references: {
          model: USERS_TABLE,
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      quotationDate: {
        allowNull: false,
        type: DataTypes.DATEONLY,
        defaultValue: DataTypes.DATEONLY,
        unique: false,
        fiel: 'quotation_date',
      },

      total: {
        allowNull: false,
        type: DataTypes.FLOAT,
        unique: false,
      },
    });
    await queryInterface.createTable(QUOTATIONS_DETAILS_TABLE, {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      idProduct: {
        allowNull: false,
        type: DataTypes.STRING(25),
        unique: false,
        field: 'id_product',
        references: {
          model: PRODUCTS_TABLE,
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      idQuotation: {
        allowNull: false,
        type: DataTypes.INTEGER,
        unique: false,
        field: 'id_quotation',
        references: {
          model: QUOTATION_TABLE,
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },

      amount: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable(CATEGORIES_TABLE);
    await queryInterface.dropTable(BRANDS_TABLE);
    await queryInterface.dropTable(MODULES_TABLE);
    await queryInterface.dropTable(USERS_HELP_TABLE);
    await queryInterface.dropTable(PERMISSIONS_TABLE);
    await queryInterface.dropTable(ROLES_TABLE);
    await queryInterface.dropTable(ROLES_PERMISSIONS_TABLE);
    await queryInterface.dropTable(VEHICLES_TABLE);
    await queryInterface.dropTable(PRODUCTS_TABLE);
    await queryInterface.dropTable(PROVIDERS_TABLE);
    await queryInterface.dropTable(USERS_TABLE);
    await queryInterface.dropTable(CLIENTS_TABLE);
    await queryInterface.dropTable(SALES_TABLE);
    await queryInterface.dropTable(BUYS_TABLE);
    await queryInterface.dropTable(BUYS_DETAILS_TABLE);
    await queryInterface.dropTable(SALES_DETAILS_TABLE);
    await queryInterface.dropTable(ORDERS_TABLE);
    await queryInterface.dropTable(ORDERS_DETAILS_TABLE);
    await queryInterface.dropTable(QUOTATION_TABLE);
    await queryInterface.dropTable(QUOTATIONS_DETAILS_TABLE);
  },
};
