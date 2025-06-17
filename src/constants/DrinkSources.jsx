import LocalCafeIcon from "@mui/icons-material/LocalCafe";
import EmojiFoodBeverageIcon from "@mui/icons-material/EmojiFoodBeverage";
import FlashOnIcon from "@mui/icons-material/FlashOn";
import BubbleChartIcon from "@mui/icons-material/BubbleChart";
import LocalDrinkIcon from "@mui/icons-material/LocalDrink";
import ScienceIcon from "@mui/icons-material/Science";
import CategoryIcon from "@mui/icons-material/Category";
import OpacityIcon from "@mui/icons-material/Opacity";
import WineBarIcon from "@mui/icons-material/WineBar";

export const caffeineSources = [
    {
        label: "Coffee",
        amount: 95,
        volume: 250,
        icon: <LocalCafeIcon color="primary" />,
    },
    {
        label: "Espresso",
        amount: 63,
        volume: 30,
        icon: <LocalCafeIcon color="primary" />,
    },
    {
        label: "Black Tea",
        amount: 47,
        volume: 250,
        icon: <EmojiFoodBeverageIcon color="primary" />,
    },
    {
        label: "Green Tea",
        amount: 28,
        volume: 250,
        icon: <EmojiFoodBeverageIcon color="primary" />,
    },
    {
        label: "Energy Drink",
        amount: 80,
        volume: 250,
        icon: <FlashOnIcon color="primary" />,
    },
    {
        label: "Cola",
        amount: 34,
        volume: 330,
        icon: <BubbleChartIcon color="primary" />,
    },
];

export const containers = [
    { label: "Glass", volume: 250, icon: <LocalDrinkIcon color="primary" /> },
    { label: "Small Bottle", volume: 500, icon: <ScienceIcon color="primary" /> },
    {
        label: "Regular Bottle",
        volume: 750,
        icon: <CategoryIcon color="primary" />,
    },
    {
        label: "Large Bottle",
        volume: 1000,
        icon: <OpacityIcon color="primary" />,
    },
    { label: "Coffee Mug", volume: 350, icon: <LocalCafeIcon color="primary" /> },
    { label: "Milk Glass", volume: 300, icon: <WineBarIcon color="primary" /> },
];
