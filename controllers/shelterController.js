var shelterModel = require('../models/shelterModel.js');

/**
 * shelterController.js
 *
 * @description :: Server-side logic for managing shelters.
 */
module.exports = {

    /**
     * shelterController.list()
     */
    list: function (req, res) {
        shelterModel.find(function (err, shelters) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting shelter.',
                    error: err
                });
            }
            return res.json(shelters);
        });
    },

    /**
     * shelterController.show()
     */
    show: function (req, res) {
        var id = req.params.id;
        shelterModel.findOne({_id: id}, function (err, shelter) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting shelter.',
                    error: err
                });
            }
            if (!shelter) {
                return res.status(404).json({
                    message: 'No such shelter'
                });
            }
            return res.json(shelter);
        });
    },

    /**
     * shelterController.create()
     */
    create: function (req, res) {
        var shelter = new shelterModel({
			name : req.body.name

        });

        shelter.save(function (err, shelter) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating shelter',
                    error: err
                });
            }
            return res.status(201).json(shelter);
        });
    },

    /**
     * shelterController.update()
     */
    update: function (req, res) {
        var id = req.params.id;
        shelterModel.findOne({_id: id}, function (err, shelter) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting shelter',
                    error: err
                });
            }
            if (!shelter) {
                return res.status(404).json({
                    message: 'No such shelter'
                });
            }

            shelter.name = req.body.name ? req.body.name : shelter.name;
			
            shelter.save(function (err, shelter) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating shelter.',
                        error: err
                    });
                }

                return res.json(shelter);
            });
        });
    },

    /**
     * shelterController.remove()
     */
    remove: function (req, res) {
        var id = req.params.id;
        shelterModel.findByIdAndRemove(id, function (err, shelter) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the shelter.',
                    error: err
                });
            }
            return res.status(204).json();
        });
    }
};
