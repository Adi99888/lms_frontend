import React, { useMemo, useState, useEffect } from "react";
import { Search, X, Star, StarHalf, SmilePlus, UserIcon } from "lucide-react";
import {
  coursePageStyles,
  coursePageCustomStyles,
} from "../assets/dummyStyles";
import courses from "../assets/dummyData";
import { useNavigate } from "react-router-dom";
import { toast, Slide, ToastContainer } from "react-toastify";

const VISIBLE_COUNT = 8;

/* ================= STAR ICON ================= */
const StarIcon = ({ filled = false, half = false, className = "" }) => {
  if (half) {
    return <StarHalf className={`w-4 h-4 ${className}`} />;
  }

  return (
    <Star
      className={`w-4 h-4 ${className}`}
      fill={filled ? "currentColor" : "none"}
    />
  );
};

const SearchIcon = () => <Search className={coursePageStyles.searchIcon} />;

/* ================= MAIN COMPONENT ================= */
const CoursePage = () => {
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState("");
  const [showAll, setShowAll] = useState(false);

  const [ratings, setRatings] = useState(() => {
    try {
      const raw = localStorage.getItem("userCourseRatings");
      return raw ? JSON.parse(raw) : {};
    } catch {
      return {};
    }
  });

  /* ===== Persist Ratings ===== */
  useEffect(() => {
    try {
      localStorage.setItem("userCourseRatings", JSON.stringify(ratings));
    } catch (err) {
      console.error("Failed to save ratings", err);
    }
  }, [ratings]);

  /* ===== Rating Handler ===== */
  const handleRating = (courseId, rating, e) => {
    if (e) e.stopPropagation();
    setRatings((prev) => ({
      ...prev,
      [courseId]: rating,
    }));
  };

  /* ===== Filter Courses ===== */
  const filteredCourses = useMemo(() => {
    const q = searchQuery.toLowerCase();
    return courses.filter(
      (course) =>
        course?.name?.toLowerCase().includes(q) ||
        course?.category?.toLowerCase().includes(q) ||
        course?.teacher?.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  const visibleCourses = showAll
    ? filteredCourses
    : filteredCourses.slice(0, VISIBLE_COUNT);

  /* ===== Toast ===== */
  const showLoginToast = () => {
    toast.error("Please login to access this course", {
      position: "top-right",
      transition: Slide,
      autoClose: 3000,
      theme: "dark",
    });
  };

  /* ===== Navigation ===== */
  const openCourse = (courseId) => {
    const token = localStorage.getItem("token");
    if (!token) {
      showLoginToast();
      return;
    }
    navigate(`/courses/${courseId}`);
  };

  /* ===== Price Helpers ===== */
  const isCourseFree = (course) => course.isFree || !course.price;

  const getPriceDisplay = (course) => {
    if (isCourseFree(course)) return "Free";

    if (course.price?.sale != null) {
      return {
        current: `₹${course.price.sale}`,
        original:
          course.price.original > course.price.sale
            ? `₹${course.price.original}`
            : null,
      };
    }

    if (course.price?.original != null) {
      return {
        current: `₹${course.price.original}`,
        original: null,
      };
    }

    return "Free";
  };

  return (
    <>
      {/* Custom styles */}
      <style>{coursePageCustomStyles}</style>

      <div className={coursePageStyles.pageContainer}>
        {/* ================= HEADER ================= */}
        <div className={coursePageStyles.headerContainer}>
          <div className={coursePageStyles.headerTransform}>
            <h1 className={coursePageStyles.headerTitle}>Our Courses</h1>
          </div>
          <p className={coursePageStyles.headerSubtitle}>
            Master New Skills with Our Cutting-Edge Courses 🚀
          </p>
        </div>

        {/* ================= SEARCH ================= */}
        <div className={coursePageStyles.searchContainer}>
          <div className={coursePageStyles.searchGradient} />
          <div className={coursePageStyles.searchInputContainer}>
            <div className={coursePageStyles.searchIconContainer}>
              <SearchIcon />
            </div>

            <input
              type="text"
              placeholder="Search courses by name, instructor or category"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setShowAll(false);
              }}
              className={coursePageStyles.searchInput}
            />

            {searchQuery && (
              <button
                type="button"
                onClick={() => {
                  setSearchQuery("");
                  setShowAll(false);
                }}
                className={coursePageStyles.clearButton}
              >
                <X size={18} />
              </button>
            )}
          </div>
        </div>

        {searchQuery && (
          <div className="text-center">
            <p className={coursePageStyles.resultsCount}>
              Found {filteredCourses.length} course
              {filteredCourses.length !== 1 ? "s" : ""} matching "{searchQuery}"
            </p>
          </div>
        )}

        {/* ================= COURSES ================= */}
        <div className={coursePageStyles.coursesGrid}>
          {filteredCourses.length === 0 ? (
            <div className={coursePageStyles.noCoursesContainer}>
              <SmilePlus className={coursePageStyles.noCoursesIcon} />
              <h3 className={coursePageStyles.noCoursesTitle}>
                No courses found
              </h3>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setShowAll(false);
                }}
                className={coursePageStyles.noCoursesButton}
              >
                Show All Courses
              </button>
            </div>
          ) : (
            <div className={coursePageStyles.coursesGridContainer}>
              {visibleCourses.map((course, index) => {
                const userRating = ratings[course.id] || 0;
                const isFree = isCourseFree(course);
                const priceDisplay = getPriceDisplay(course);

                return (
                  <div
                    key={course.id}
                    role="button"
                    tabIndex={0}
                    onClick={() => openCourse(course.id)}
                    onKeyDown={(e) =>
                      e.key === "Enter" && openCourse(course.id)
                    }
                    className={coursePageStyles.courseCard}
                    style={{ animationDelay: `${index * 80}ms` }}
                  >
                    <div className={coursePageStyles.courseCardInner}>
                      <div className={coursePageStyles.courseCardContent}>
                        <div className={coursePageStyles.courseImageContainer}>
                          <img
                            src={course.image}
                            alt={course.name}
                            className={coursePageStyles.courseImage}
                          />
                        </div>

                        <div className={coursePageStyles.courseInfo}>
                          <h3 className={coursePageStyles.courseName}>
                            {course.name}
                          </h3>

                          <div className={coursePageStyles.teacherContainer}>
                            <UserIcon />
                            <span className={coursePageStyles.teacherName}>
                              {course.teacher}
                            </span>
                          </div>

                          {/* ===== Rating ===== */}
                          <div className={coursePageStyles.ratingContainer}>
                            {[1, 2, 3, 4, 5].map((star) => (
                              <button
                                key={star}
                                type="button"
                                onClick={(e) =>
                                  handleRating(course.id, star, e)
                                }
                                className={coursePageStyles.ratingStarButton}
                                aria-label={`Rate ${star} stars`}
                              >
                                <StarIcon
                                  filled={star <= userRating}
                                  className={
                                    star <= userRating
                                      ? "text-yellow-400"
                                      : "text-gray-300"
                                  }
                                />
                              </button>
                            ))}
                          </div>

                          {/* ===== Price ===== */}
                          <div className={coursePageStyles.priceContainer}>
                            {isFree ? (
                              <span className={coursePageStyles.priceFree}>
                                Free
                              </span>
                            ) : (
                              <>
                                <span className={coursePageStyles.priceCurrent}>
                                  {priceDisplay.current}
                                </span>
                                {priceDisplay.original && (
                                  <span
                                    className={coursePageStyles.priceOriginal}
                                  >
                                    {priceDisplay.original}
                                  </span>
                                )}
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* ================= SHOW MORE ================= */}
        {!showAll && filteredCourses.length > VISIBLE_COUNT && (
          <div className={coursePageStyles.showMoreContainer}>
            <button
              onClick={() => setShowAll(true)}
              className={coursePageStyles.showMoreButton}
            >
              Show More Courses
            </button>
          </div>
        )}

        <ToastContainer
          position="top-right"
          autoClose={3000}
          transition={Slide}
          theme="dark"
        />
      </div>
    </>
  );
};

export default CoursePage;
