'use strict';
const {PERMISSIONS_TABLE} = require('./../models/permissionsModel')
const {DataTypes, Sequelize} = require('sequelize');
const MODULES_TABLE = require ('../models/modulesModel')
const {ROLES_TABLE} = require('./../models/rolesModel');
const {ROLES_PERMISSIONS_TABLE} = require('./../models/rolesPermissionsModel');
const {USERS_TABLE} = require('./../models/usersModel');
const {CLIENTS_TABLE} = require('./../models/clientsModel');
const {SALES_TABLE} = require('./../models/salesModel');


module.exports = {
  async up (queryInterface) {
    await queryInterface.createTable(PERMISSIONS_TABLE,{
         id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
    },
    idModule: {
        allowNull: false,
        type: DataTypes.INTEGER,
        unique: false,
        field: 'id_module',
        references: {
            model: MODULES_TABLE,
            key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
    },
    name: {
        allowNull: false,
        type: DataTypes.STRING(50),
        unique: false,
    }
      
  });
   await queryInterface.createTable(ROLES_PERMISSIONS_TABLE,{
          id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        idRol: {
            allowNull: false,
            type: DataTypes.INTEGER,
            unique: false,
            field: 'id_rol',
            references: {
                model: ROLES_TABLE,
                key: 'id'
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE'
        },
        idPermissions: {
            allowNull: false,
            type: DataTypes.INTEGER,
            unique: false,
            field: 'id_permissions',
            references: {
                model: PERMISSIONS_TABLE,
                key: 'id'
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE'
        }
      
  });
      await queryInterface.createTable(ROLES_TABLE,{
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: DataTypes.INTEGER
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
          field: 'created_at'
      },
      status: {
          allowNull: false,
          type: DataTypes.BOOLEAN,
          unique: false,
          defaultValue: true,
      }

    });

    await queryInterface.changeColumn(USERS_TABLE, 'idRol', {
      allowNull: false,
      type: DataTypes.INTEGER,
      unique: false,
      field: 'id_rol',
      references: {
          model: ROLES_TABLE,
          key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
  },);

  await queryInterface.createTable(CLIENTS_TABLE,{
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
    },
    idUser: {
        allowNull: true,
        type: DataTypes.INTEGER,
        unique: false,
        field: 'id_user',
        references: {
            model: USERS_TABLE,
            key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
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
        field: 'document_type'
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
    }
});
await queryInterface.createTable(SALES_TABLE,{
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
  },

  async down (queryInterface ) {
    await queryInterface.dropTable(PERMISSIONS_TABLE)
    await queryInterface.dropTable(ROLES_PERMISSIONS_TABLE)
    await queryInterface.dropTable(ROLES_TABLE)
    await queryInterface.dropTable(CLIENTS_TABLE)
    await queryInterface.dropTable(SALES_TABLE)


  }
};
