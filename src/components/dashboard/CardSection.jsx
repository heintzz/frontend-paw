import { convertNumberToCurrencyFormat } from "@/helpers/helper";

const CardSection = ({ item, loadingSummary }) => {
  const { name, amount, Icon } = item;
  return (
    <div className="flex flex-col justify-between w-full md:flex-grow h-[150px] md:h-[250px] p-4 rounded-lg shadow-lg hover:shadow-xl  bg-white">
      {loadingSummary ? (
        <>
          <div className="w-14 h-14 bg-gray-300 rounded-md animate-pulse"></div>
          <div>
            <div className="animate-pulse h-[20px] w-[30%] bg-gray-300 rounded-md mt-2"></div>
            <div className="animate-pulse h-[20px] w-[50%] bg-gray-300 rounded-md mt-2"></div>
          </div>
        </>
      ) : (
        <>
          <Icon size="3.5em" className="bg-main p-3 rounded-xl" />
          <div>
            <p className="sm:text-xl font-medium">{name}</p>
            <p className="sm:text-2xl font-semibold">Rp{convertNumberToCurrencyFormat(amount)}</p>
          </div>
        </>
      )}
    </div>
  );
};

export default CardSection;
