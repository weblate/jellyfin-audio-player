package nl.moeilijkedingen.jellyfinaudioplayer;

import androidx.test.rule.ActivityTestRule;

import nl.moeilijkedingen.jellyfinaudioplayer.R;
import org.junit.AfterClass;
import org.junit.BeforeClass;
import org.junit.ClassRule;
import org.junit.Rule;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.junit.runners.JUnit4;
import java.util.Arrays;

import tools.fastlane.screengrab.Screengrab;
import tools.fastlane.screengrab.UiAutomatorScreenshotStrategy;
import tools.fastlane.screengrab.cleanstatusbar.BluetoothState;
import tools.fastlane.screengrab.cleanstatusbar.CleanStatusBar;
import tools.fastlane.screengrab.cleanstatusbar.MobileDataType;
import tools.fastlane.screengrab.locale.LocaleTestRule;

import androidx.test.espresso.NoMatchingViewException;

import static androidx.test.espresso.Espresso.onView;
import static androidx.test.espresso.action.ViewActions.click;
import static androidx.test.espresso.action.ViewActions.typeText;
import static androidx.test.espresso.assertion.ViewAssertions.matches;
import static androidx.test.espresso.matcher.ViewMatchers.withContentDescription;
import static androidx.test.espresso.matcher.ViewMatchers.isDisplayed;
import static androidx.test.espresso.matcher.ViewMatchers.withId;
import static androidx.test.espresso.matcher.ViewMatchers.withText;

import static org.hamcrest.core.AllOf.allOf;

@RunWith(JUnit4.class)
public class ScreenshotTest {
    @ClassRule
    public static final LocaleTestRule localeTestRule = new LocaleTestRule();

    @Rule
    public ActivityTestRule<MainActivity> activityRule = new ActivityTestRule<>(MainActivity.class);

    @BeforeClass
    public static void beforeAll() {
        Screengrab.setDefaultScreenshotStrategy(new UiAutomatorScreenshotStrategy());
        CleanStatusBar.enableWithDefaults();
    }

    @AfterClass
    public static void afterAll() {
        CleanStatusBar.disable();
    }

    /*
    Custom wait function. In order to make sure each button press yields a
    desirable screen, we use the wait function to delay further actions until
    the current one has achieved its purpose.

    `duration` indicates the amount of milli-seconds to wait. The value of
    `duration` is acquired by emperical trial-and-error.
    */
    public void wait(int duration) {
      try {
          Thread.sleep(duration);
      } catch (InterruptedException e) {
          e.printStackTrace();
      }
    }

    public void inputText(Integer id, String text) {
        try {
            onView(allOf(withId(id))).perform(typeText(text));
        } catch (NoMatchingViewException e) {
            e.printStackTrace();
        }
    }

    @Test
    public void testTakeScreenshot() {
        System.out.println("AVAILABLE IDS:" + Arrays.toString(R.id.class.getFields()));
        // wait(10000);

        // Screengrab.screenshot("04RecentAlbums");
        // onView(allOf(withId(R.id.all_albums))).perform(click());
        // wait(5000);
        // Screengrab.screenshot("05AlbumsScreen");

        // onView(allOf(withId(R.id.search_tab))).perform(click());
        // wait(5000);
        // onView(allOf(withId(R.id.search_input_container))).perform(click());
        // wait(5000);
        // onView(allOf(withId(R.id.search_input_textinput))).perform(typeText("bicep"));
        // wait(5000);

        // onView(allOf(withId(R.id.search_result_a644f8d23821601d2feb86ddae5e64f4))).perform(click());
        // wait(5000);
        // Screengrab.screenshot("02AlbumScreen");

        // onView(allOf(withId(R.id.play_album))).perform(click());
        // wait(5000);
        // onView(allOf(withId(R.id.open_player_modal))).perform(click());
        // wait(5000);
        // Screengrab.screenshot("01PlayModal");
    }
}