import { FC } from "react";
import { SvgProps } from "react-native-svg";
import ActionIcon from "@/assets/images/icons/action.svg";
import CalendarIcon from "@/assets/images/icons/calendar.svg";
import HomeIcon from "@/assets/images/icons/home.svg";
import IncomeIcon from "@/assets/images/icons/income.svg";
import ExpenseIcon from "@/assets/images/icons/expense.svg";
import SavingsIcon from "@/assets/images/icons/savings.svg";
import TransactionsIcon from "@/assets/images/icons/transactions.svg";
import TransferIcon from "@/assets/images/icons/transfer.svg";
import MenuIcon from "@/assets/images/icons/menu.svg";
import NotificationsIcon from "@/assets/images/icons/notifications.svg";
import ShowIcon from "@/assets/images/icons/show.svg";
import HideIcon from "@/assets/images/icons/hide.svg";
import CancelIcon from "@/assets/images/icons/cancel.svg";
import ConfirmIcon from "@/assets/images/icons/confirm.svg";
import CancelFillIcon from "@/assets/images/icons/cancel-fill.svg";
import ConfirmFillIcon from "@/assets/images/icons/confirm-fill.svg";
import EditIcon from "@/assets/images/icons/edit.svg";
import DeleteIcon from "@/assets/images/icons/delete.svg";
import SearchIcon from "@/assets/images/icons/search.svg";
import NotFoundIcon from "@/assets/images/icons/not-found.svg";
import AddIcon from "@/assets/images/icons/add.svg";

export type Icon =
  | "ActionIcon"
  | "CalendarIcon"
  | "HomeIcon"
  | "IncomeIcon"
  | "ExpenseIcon"
  | "SavingsIcon"
  | "TransactionsIcon"
  | "TransferIcon"
  | "MenuIcon"
  | "NotificationsIcon"
  | "ShowIcon"
  | "HideIcon"
  | "CancelIcon"
  | "ConfirmIcon"
  | "CancelFillIcon"
  | "ConfirmFillIcon"
  | "EditIcon"
  | "DeleteIcon"
  | "SearchIcon"
  | "NotFoundIcon"
  | "AddIcon";
export const ICONS: { [key: string]: FC<SvgProps> } = {
  ActionIcon,
  CalendarIcon,
  HomeIcon,
  IncomeIcon,
  ExpenseIcon,
  SavingsIcon,
  TransactionsIcon,
  TransferIcon,
  MenuIcon,
  NotificationsIcon,
  ShowIcon,
  HideIcon,
  CancelIcon,
  ConfirmIcon,
  CancelFillIcon,
  ConfirmFillIcon,
  EditIcon,
  DeleteIcon,
  SearchIcon,
  NotFoundIcon,
  AddIcon,
};
