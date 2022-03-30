/* eslint-disable testing-library/no-unnecessary-act */
import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import InfoContainer, { InfoContainerProps } from ".";

/* 
선언적 프로그래밍
중복되는 코드 제거를 위해서!
*/

const renderInfoContainer = (props?: Partial<InfoContainerProps>) => {
  // mock 함수
  const handleSubmit = jest.fn();
  const handleCancel = jest.fn();

  // 컴포넌트 렌더링
  render(
    <InfoContainer onSubmit={handleSubmit} onCancel={handleCancel} {...props} />
  );

  // 중복으로 사용될 요소들을 DOM에서 가져온다
  const Heading = () => screen.getByText("Welcome, kyoung-jnn");

  const FirstNameInput = () => screen.getByLabelText("First Name");

  const LastNameInput = () => screen.getByLabelText("Last Name");

  const IsOverAgeInput = () =>
    screen.getByLabelText("Are you at least 21 years old?");

  const FavoriteDrinkInput = () =>
    screen.queryByLabelText("What's your favorite drink?");

  const SubmitButton = () => screen.getByText("Apply");
  const CancelButton = () => screen.getByText("Cancel");

  // 아래와 같이 DOM에 접근할 헬퍼 함수를 정의!
  function changeFirstName(name: string) {
    userEvent.type(FirstNameInput(), name);
  }

  function changeLastName(name: string) {
    userEvent.type(LastNameInput(), name);
  }

  function changeFavoriteDrinkInput(name: string) {
    userEvent.type(FavoriteDrinkInput() as HTMLElement, name);
  }

  async function clickIsOverAge() {
    await act(async () => {
      userEvent.click(IsOverAgeInput());
    });
  }

  function clickSubmit() {
    userEvent.click(SubmitButton());
  }

  function clickCancel() {
    userEvent.click(CancelButton());
  }

  return {
    handleSubmit,
    handleCancel,
    changeFirstName,
    changeLastName,
    clickIsOverAge,
    clickSubmit,
    clickCancel,
    FirstNameInput,
    LastNameInput,
    IsOverAgeInput,
    SubmitButton,
    CancelButton,
    Heading,
    FavoriteDrinkInput,
    changeFavoriteDrinkInput,
  };
};

describe("<InfoContainer>", () => {
  it("기본 필드 렌더링해야 합니다.", () => {
    const {
      FirstNameInput,
      LastNameInput,
      IsOverAgeInput,
      SubmitButton,
      Heading,
      FavoriteDrinkInput,
      CancelButton,
    } = renderInfoContainer();

    // 헤더 출력 테스트
    expect(Heading()).toBeInTheDocument();
    // 인풋 출력 테스트
    expect(FirstNameInput()).toBeInTheDocument();
    expect(LastNameInput()).toBeInTheDocument();
    expect(IsOverAgeInput()).toBeInTheDocument();
    expect(FavoriteDrinkInput()).not.toBeInTheDocument();
    // 버튼 출력 테스트
    expect(SubmitButton()).toBeInTheDocument();
    expect(CancelButton()).toBeInTheDocument();
  });

  it("성인 인증 체크 박스를 토글하고 음료를 입력해야 합니다.", async () => {
    const { clickIsOverAge, FavoriteDrinkInput } = renderInfoContainer();

    expect(FavoriteDrinkInput()).not.toBeInTheDocument();

    await clickIsOverAge();
    expect(FavoriteDrinkInput()).toBeInTheDocument();
  });

  it("취소 버튼이 클릭되면 handleClick 호출되야 합니다.", () => {
    const { clickCancel, handleCancel } = renderInfoContainer();

    clickCancel();
    expect(handleCancel).toBeCalled();
  });

  it("form 값으로 handleSubmit 호출되야 합니다.", async () => {
    const {
      changeFirstName,
      changeLastName,
      clickIsOverAge,
      changeFavoriteDrinkInput,
      clickSubmit,
      handleSubmit,
    } = renderInfoContainer();

    // input
    changeFirstName("test");
    changeLastName("test");
    // 체크박스
    await clickIsOverAge();
    // input
    changeFavoriteDrinkInput("beer");
    // 버튼 클릭
    clickSubmit();

    // 기대 결과
    expect(handleSubmit).toHaveBeenCalledWith({
      first_name: "test",
      last_name: "test",
      is_over_age: true,
      favorite_drink: "beer",
    });
  });
});
