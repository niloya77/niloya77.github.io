public class Pizza {

    private int price;
    private Boolean veg;

    private int extraCheesePrice = 100;

    private int extraToppingsadded = 150;

    private int backPackPrice = 20;

    private int basePizzaPrice;

    private boolean isExtraChesseAdded;

    private boolean isExtraToppingsAdded;

    private boolean isOptedForTakeAway;



    public Pizza (Boolean veg) {

        this.veg = veg;

        if (this.veg) {
            this.price = 300;

        }

        else {
            this.price = 400;

        }

        basePizzaPrice = this.price;

    }

    public void addExtraCheese() {
        isExtraChesseAdded= true;
        this.price += extraCheesePrice;


    }

    public void addExtraTopping(){
        isExtraToppingsAdded= true;
        this.price += extraToppingsadded;

    }
    public void takeAway(){
        isOptedForTakeAway = true;
        this.price += backPackPrice;


    }

    public void getBill(){
        String bill = "";
        System.out.println("Pizza:" + basePizzaPrice);
        if (isExtraChesseAdded) {
            bill += "Extra chesse added : " + extraCheesePrice + "\n ";
        }
        if (isExtraToppingsAdded) {
            bill += "Extra toppings added : " + extraToppingsadded + "\n ";
        }
        if (isOptedForTakeAway) {
            bill += "Take Away : " + backPackPrice + "\n ";
        }
        bill +="Bill:" + this.price + "\n";

        System.out.println(bill);


    }
}
