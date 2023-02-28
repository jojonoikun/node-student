/*
 Navicat Premium Data Transfer

 Source Server         : db
 Source Server Type    : MySQL
 Source Server Version : 100410
 Source Host           : localhost:3306
 Source Schema         : sp

 Target Server Type    : MySQL
 Target Server Version : 100410
 File Encoding         : 65001

 Date: 05/04/2022 10:19:58
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for stuinfo
-- ----------------------------
DROP TABLE IF EXISTS `stuinfo`;
CREATE TABLE `stuinfo`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `sname` varchar(30) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `birth` date NOT NULL,
  `sex` char(2) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `mobile` char(11) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `img` longtext CHARACTER SET utf8 COLLATE utf8_general_ci NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 44 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of stuinfo
-- ----------------------------
INSERT INTO `stuinfo` VALUES (1, '张四', '1999-05-02', '男', '12388888888', '1.jpg');
INSERT INTO `stuinfo` VALUES (2, '张三', '2001-05-02', '男', '12377777777', '2.jpg');
INSERT INTO `stuinfo` VALUES (3, '李ad', '2001-01-08', '女', '12366666666', '2.jpg');
INSERT INTO `stuinfo` VALUES (4, '小明', '2001-05-02', '男', '12355555555', '2.jpg');
INSERT INTO `stuinfo` VALUES (29, '小华', '2022-02-18', '男', '12333333333', '3.jpg');
INSERT INTO `stuinfo` VALUES (30, '小可', '2022-02-18', '男', '12333333333', '1646038138823-Pumpkin.png');
INSERT INTO `stuinfo` VALUES (31, '小哈', '2022-02-18', '男', '12333333333', NULL);

SET FOREIGN_KEY_CHECKS = 1;
